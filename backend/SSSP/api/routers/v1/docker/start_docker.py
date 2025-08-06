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
# Port Randomization
# Volume Off
# Command Regex
@router.post("/start/{image_id}", response_model=dict)
def start_docker_container(
    command: str = None,
    ports: dict = None,
    environment: dict = None,
    volumes: dict = None,
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
    ):

    client = get_docker_client()
    try:
        logging.info(f"Starting container from image {image_id}")
        container = client.containers.run(
            image=image_id,
            command=command,
            ports=ports,
            environment=environment,
            volumes=volumes,
            detach=True
        )
        logging.info(f"Successfully started container {container.id}")
        return container.id
    except docker.errors.ImageNotFound:
        logging.error(f"Image ID[{image_id}] not found")
        return None
    except docker.errors.APIError as e:
        logging.error(f"Docker API Error: {e}")
        return None
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        return None