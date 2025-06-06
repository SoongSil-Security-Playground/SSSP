from fastapi import APIRouter

# directory dependency

from SSSP.api.routers.v1.auth import (
    auth_check,
    register,
    login,
    logout,
    send_auth_code,
    verify_auth_code,
    update_password,
    is_admin,
)

from SSSP.api.routers.v1.user import (
    delete_current_user,
    get_current_user,
    get_user_list,
    update_current_user,
    delete_specific_user,
)

from SSSP.api.routers.v1.challange import (
    get_challenges,
    create_challenge,
    delete_challenge,
    update_challenge,
    submit_challenge,
    solve_log,
    get_user_solved_challenges,
    download_challenge_file,
)

from SSSP.api.routers.v1.score import get_all_score, get_my_score

from SSSP.api.routers.v1.notice import (
    get_all_notice,
    create_notice,
    update_notice,
    delete_notice,
)

router = APIRouter()

# User
## scoring
router.include_router(get_all_score.router, tags=["scoring"])
router.include_router(get_my_score.router, prefix="/score", tags=["scoring"])
## auth
router.include_router(login.router, prefix="/auth", tags=["auth"])
router.include_router(logout.router, prefix="/auth", tags=["auth"])
router.include_router(register.router, prefix="/auth", tags=["auth"])
router.include_router(auth_check.router, prefix="/auth", tags=["auth"])
router.include_router(send_auth_code.router, prefix="/auth", tags=["auth"])
router.include_router(verify_auth_code.router, prefix="/auth", tags=["auth"])

## user
router.include_router(get_user_list.router, prefix="/user", tags=["user"])
router.include_router(update_password.router, prefix="/user", tags=["user"])
router.include_router(delete_current_user.router, prefix="/user", tags=["user"])
router.include_router(get_current_user.router, prefix="/user", tags=["user"])
router.include_router(update_current_user.router, prefix="/user", tags=["user"])

## challenge
router.include_router(download_challenge_file.router, prefix="/challenges/download", tags=["challenge"])
router.include_router(get_challenges.router, prefix="/challenges", tags=["challenge"])
router.include_router(submit_challenge.router, prefix="/challenges", tags=["challenge"])
router.include_router(
    get_user_solved_challenges.router, prefix="/challenges", tags=["challenge"]
)
router.include_router(
    create_challenge.router, prefix="/admin/challenges", tags=["challenge"]
)
router.include_router(
    delete_challenge.router, prefix="/admin/challenges", tags=["challenge"]
)
router.include_router(
    update_challenge.router, prefix="/admin/challenges", tags=["challenge"]
)

# admin
router.include_router(solve_log.router, prefix="/admin", tags=["logs"])

## notice
router.include_router(create_notice.router, prefix="/admin", tags=["notice"])
router.include_router(update_notice.router, prefix="/admin", tags=["notice"])
router.include_router(get_all_notice.router, tags=["notice"])
router.include_router(delete_notice.router, prefix="/admin", tags=["notice"])

## User
router.include_router(is_admin.router, prefix="/admin", tags=["auth"])
router.include_router(delete_specific_user.router, prefix="/admin", tags=["user"])