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


def remove_docker_image(
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
    ):

    client = get_docker_client()
    try:
        # logging.info(f"Removing image {image_id}")
        # client.images.remove(image=image_id, force=True)
        # logging.info("Successfully removed image")

        # db.query(models.DockerImage).filter(models.DockerImage.id == image_id).delete()
        # db.commit()
        return True
    except docker.errors.ImageNotFound:
        logging.warning(f"Image ID[{image_id}] not found")
        return False
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        return False
