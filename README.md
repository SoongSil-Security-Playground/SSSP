# SSSP
Soongsil Security Playground V1.0

숭실대학교 소프트웨어학부 융합보안프로젝트2 과목에서 개발한 프로젝트 Soongsil Security Playground 입니다.

## Getting Started
**You can run ctf with only one command!!!**
```bash
./run.sh
```

### Requirements
- just docker!

---

## Development
SSSP uses the following technology stacks

- Backend
    - python3
    - FastAPI
    - Redis ( for Email Authentication )  
- Data Storage
    - Mysql ( with sqlalchemy in FastAPI )
    - If you change the mysql password, you have to delete volume of mysql
- Frontend
    - React

## Feature
- Backend Use Docker-Volume based storage.
    - So you don't need to setup mysql, challenge_directory!

### Todo:
- mysql db 구조 갈아엎기
- backend pre_start entrypoint 갈아엎기
- admin panel 프엔수정
    - 문제 edit 버튼이 ux 나쁨
    - 문제미리보기에서 flag 안보임
- Delete Submission
- Fix Delete Challenge File
- Authorization when Challenge File Download 
    - only authroized user can download challenge file.
- Fix delete user in admin panel
- MinIO Storage 적용

### Prototype - V1.0 변동사항
- [chore] Update README.md
- [Backend, Fix] Challenge Download Server Refactoring. make server to use local docker-storage.
- [Frontend, Refactoring] Challenge Form Default value {min, points, decay}
- [Frontend, Add] level field to challengeForm
- [Backend-Frontend, Feat] admin can select if use email auth mode
- [Forntend, chore] Challenge Card can Remember the original flag
- [Frontend, Docker] Do not use caching for packages.json when update frontend
- [chore] Challenge Form {decay, static, points, min points} Default value 설정
- [env] default env 추가
