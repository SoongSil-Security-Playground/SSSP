from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session

# directory dependency
from SSSP.api.models import models
from SSSP.api.models.enums.user_role import UserRole

from SSSP.api.core.database import *
from SSSP.api.core.auth import get_current_user_by_jwt

from SSSP.api.schemas import schema_notice

from pathlib import Path
from io import BytesIO

import tarfile
import docker
import os
import uuid
import shutil
import socket
import json
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

client = None

def get_docker_client():
    global client
    if client is None:
        try:
            client = docker.from_env()
        except docker.errors.DockerException as e:
            logging.error(f"Failed to connect docker socket: {e}")
            raise
    return client

router = APIRouter()

# TODO
@router.post("/start/{chall_id}", response_model=str)
def start_docker_container(
    chall_id: int,
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
    ):

    # chall_id & user_id
    user = get_current_user_by_jwt(token, db)

    cont_name = f'cont-{user.id}-{chall_id}-{uuid.uuid4().hex[:4]}'
    client = get_docker_client()
    try:

        port_info = '7681/tcp'
        container = client.containers.run(
            image="sssp-instance_deployer",
            detach=True,       # -d (background)
            auto_remove=True,  # --rm (auto remove)
            ports={
                port_info: None
            },
            name=cont_name       # --name (container name)
        )

        container.reload()
        logging.info(f"Successfully started container {container.id}")

        port_mapping = container.ports[port_info]
        random_host_port = port_mapping[0]['HostPort']
        logging.info(f"Port Mapping to {random_host_port}")
        
        docker_container = models.DockerContainer(
            container_name=container.name,
            # port = container.ports,
            port = random_host_port,
            chall_id = chall_id,
            user_id = user.id
        )
        db.add(docker_container)
        db.commit()
        db.refresh(docker_container)

        # Copy Challenge & Flag
        chall_db = db.query(models.Challenge).filter(models.Challenge.id == chall_id).first()
        chall_flag = chall_db.flag
        chall_filepath = chall_db.file_path
        chall_filename = chall_db.original_filename
        chall_filecontent = None
        
        UPLOAD_DIR = Path(settings.challenge_file_path)
        real_file_path = UPLOAD_DIR / chall_filepath.split("/")[-1]

        if not real_file_path.exists():
            logging.error(f"Challenge file not found: {real_file_path}")
            raise HTTPException(status_code=404, detail="Challenge file not found")

        with open(real_file_path, "rb") as f:
            chall_filecontent = f.read()

        logging.info("get file success")

        tar_stream = BytesIO()
        with tarfile.open(fileobj=tar_stream, mode='w') as tar:
            tarinfo = tarfile.TarInfo(name=chall_filename)
            tarinfo.size = len(chall_filecontent)
            tar.addfile(tarinfo, BytesIO(chall_filecontent))

            logging.info("Added challenge file to tar")
            tarinfo = tarfile.TarInfo(name='flag')
            tarinfo.size = len(chall_flag)
            tar.addfile(tarinfo, BytesIO(chall_flag.encode()))
            logging.info("Added flag file to tar")

        tar_stream.seek(0)

        destination_path = "/home/ctfuser"
        container.put_archive(path=destination_path, data=tar_stream)

        # change owner
        command = []
        command.append(f"chmod 700 {destination_path}/flag")
        
        # add sid & execute permission
        command.append(f"chmod 555 {destination_path}/{chall_filename}")
        command.append(f"chmod +s {destination_path}/{chall_filename}")
        for cmd in command:
            exit_code, output = container.exec_run(cmd, user='root')

        url = f'http://{settings.public_ip}:{docker_container.port}'
        logging.info(f"Service URL: {url}")
        return url

    except docker.errors.ImageNotFound:
        logging.error(f"Image ID[{image_id}] not found")
        return ""
    except docker.errors.APIError as e:
        logging.error(f"Docker API Error: {e}")
        return ""
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        
        return ""