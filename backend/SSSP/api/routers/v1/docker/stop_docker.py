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

def stop_docker_container(container_id):
    client = get_docker_client()
    try:
        logging.info(f"Stopping container {container_id}")
        container = client.containers.get(container_id)
        container.stop()
        logging.info(f"Successfully stopped container {container_id}")
        return True
    except docker.errors.NotFound:
        logging.warning(f"Container ID[{container_id}] not found")
        return False
    except Exception as e:
        logging.error(f"Unknown Error: {e}")
        return False