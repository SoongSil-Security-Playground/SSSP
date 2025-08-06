from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# directory dependency
from SSSP.api.models import models
from SSSP.api.models.enums.user_role import UserRole

from SSSP.api.schemas import schema_submission
from SSSP.api.core.database import *
from SSSP.api.core.auth import get_current_user_by_jwt

from SSSP.config import settings

import logging
logging.basicConfig(level=logging.INFO) 

router = APIRouter()

@router.get("/me", response_model=list[schema_submission.SubmissionResponse])
def get_user_submission(
    token: str = Depends(settings.oauth2_scheme), db: Session = Depends(get_db)
):
    user = get_current_user_by_jwt(token, db)

    # [TODO] Solve Speed Issue
    # 1. N+1 Query Problem
    submissions = db.query(models.Submission).filter(models.Submission.user_id == user.id).all()
    response = []
    for submission in submissions:
        username = submission.user.username if submission.user else None
        challenge_name = submission.challenge.name if submission.challenge else None
        resp = schema_submission.SubmissionResponse(
            id=submission.id,
            user_id=submission.user_id,
            username=username,
            challenge_id=submission.challenge_id,
            challenge_name=challenge_name,
            submitted_flag=submission.submitted_flag,
            submit_time=submission.submit_time,
            status=submission.status,
        )
        response.append(resp)
    return response[::-1]