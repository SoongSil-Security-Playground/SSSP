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

@router.post("/remove/{image_id}", response_model=dict)
def remove_docker_image(
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
    ):

    client = get_docker_client()
    try:
        logging.info(f"Removing image {image_id}")
        client.images.remove(image=image_id, force=True)
        logging.info("Successfully removed image")
        return True
    except docker.errors.ImageNotFound:
        logging.warning(f"Image ID[{image_id}] not found")
        return False
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        return False
