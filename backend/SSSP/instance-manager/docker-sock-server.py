import docker
import os
import uuid
import shutil

# [TODO] Client socket을 전역으로 빼기 
# [TODO] Get handle 함수 만들어서 한번 쓸때마다 connection check / return handle 
# # Docker 클라이언트 초기화
# # Docker 데몬에 연결합니다. 기본적으로 로컬 소켓을 사용합니다.
# try:
#     client = docker.from_env()
# except docker.errors.DockerException:
#     print("Docker 데몬에 연결할 수 없습니다. Docker가 실행 중인지 확인하세요.")
#     exit()

def create_docker_image(dockerfile_directory):
    # 랜덤 태그 생성 (예: 'random-image-a1b2c3d4:latest')
    image_tag = f"Challenge-{uuid.uuid4().hex[:8]}:latest"
    
    try:
        # build with directory path        
        image, build_logs = client.images.build(
            path=dockerfile_directory,
            tag=image_tag,
            rm=True # Remove Temp Container
        )
        
        print(f"Create docker image successfully! ")
        print(f"ID : {image.id}")
        return image.id
    except docker.errors.BuildError as e:
        print(f"Build Error: {e}")
        return None
    except TypeError:
        print(f"Input Error : '{dockerfile_directory}'")
        return None
    except Exception as e:
        print(f"Unknown Error: {e}")
        return None

def remove_docker_image(dockId):
    try:
        client.images.remove(image=dockId, force=True)
        print("Delete docker image Successfully")
        return True
    except docker.errors.ImageNotFound:
        print(f"Failed to find Image ID[{dockId}]")
        return False
    except Exception as e:
        print(f"Unknown ERror: {e}")
        return False

def stop_docker_container(conId):
    try:
        print(f"Stop container :  ID[{conId}]")
        container = client.containers.get(conId)
        container.stop()
        print(f"Stop Container Successfully!  ID[{conId}]")
        return True
    except docker.errors.NotFound:
        print(f"Failed to find Container")
        return False
    except Exception as e:
        print(f"Unknown Error: {e}")
        return False

def start_docker_container(dockId, **kwargs):
    try:
        container = client.containers.run(dockId, detach=True, **kwargs)
        print(f"Create Container Successfully!")
        print(f"ID: {container.id}")
        return container.id
    except docker.errors.ImageNotFound:
        print(f"Failed to find Image ID[{dockId}]")
        return None
    except Exception as e:
        print(f"Unknown Error: {e}")
        return None

if __name__ == '__main__':
    # --- 함수 테스트 예제 ---
    
    # 테스트를 위한 임시 빌드 디렉토리 및 Dockerfile 생성
    build_dir = './temp_build_context'
    if not os.path.exists(build_dir):
        os.makedirs(build_dir)
    
    sample_dockerfile_content = """
    FROM alpine:latest
    CMD ["echo", "Hello from a dynamically built Docker Container!"]
    """
    with open(os.path.join(build_dir, 'Dockerfile'), 'w') as f:
        f.write(sample_dockerfile_content)

    # 1. Docker 이미지 생성 테스트
    new_dockId = create_docker_image(build_dir)

    if new_dockId:
        # 2. Docker 컨테이너 시작 테스트
        container_id = start_docker_container(new_dockId)

        if container_id:
            # 잠시 대기 후 로그 확인
            import time
            time.sleep(3)
            try:
                container_logs = client.containers.get(container_id).logs()
                print(f"\n--- 컨테이너 '{container_id}' 로그 ---")
                print(container_logs.decode('utf-8').strip())
                print("--------------------------------\n")
            except docker.errors.NotFound:
                print(f"로그를 확인하기 전에 컨테이너 '{container_id}'가 사라졌습니다.")

            # 3. Docker 컨테이너 중지 테스트
            stop_docker_container(container_id)

        # 4. Docker 이미지 삭제 테스트
        remove_docker_image(new_dockId)
        
    # 테스트 후 임시 디렉토리 삭제
    shutil.rmtree(build_dir)


'''
# HOST에서 돌고있는 server.
# 도커관련 요청을 처리 
# 가능한 요청은 다음과 같음 
dockId = Image
conId  = Container 

- Create Docker 
    - Request
        - dockerfile directory [in docker] ( allocate random tag )
    - Response 
        - dockId

- Remove Docker Image
    - Request
        - dockId
    - Response
        - Success / Failed


- Stop Docker Instance
    - Request
        - conId
    - Response
        - Success / Failed
    
- Start Docker Iinstance
    - Request
        - dockId
    - Response
        - conId

'''