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

def create_docker_image(dockerfile_directory):
    client = get_docker_client()
    image_tag = f"challenge-{uuid.uuid4().hex[:8]}:latest"
    
    try:
        logging.info(f"Building image from {dockerfile_directory} with tag {image_tag}")
        image, build_logs = client.images.build(
            path=dockerfile_directory,
            tag=image_tag,
            rm=True
        )
        logging.info(f"Successfully created image {image.id}")
        return image.id
    except docker.errors.BuildError as e:
        logging.error(f"Build Error: {e}")
        for log in e.build_log:
            if 'stream' in log:
                logging.error(log['stream'].strip())
        return None
    except TypeError as e:
        logging.error(f"Input Error : '{dockerfile_directory}', {e}")
        return None
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        return None
