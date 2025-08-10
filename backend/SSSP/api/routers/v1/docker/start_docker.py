from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session

# directory dependency
from SSSP.api.models import models
from SSSP.api.models.enums.user_role import UserRole

from SSSP.api.core.database import *
from SSSP.api.core.auth import get_current_user_by_jwt

from SSSP.api.schemas import schema_notice

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