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

@router.get("/all", response_model=list[schema_submission.SubmissionResponse])
def get_all_submission(
    token: str = Depends(settings.oauth2_scheme), db: Session = Depends(get_db)
):
    user = get_current_user_by_jwt(token, db)

    submission_list = db.query(models.Submission).all()
    submission_response = []
    for submission in submission_list:
        username = submission.user.username if submission.user else None
        challenge_name = None
        if submission.challenge_id:
            challenge = db.query(models.Challenge).filter(models.Challenge.id == submission.challenge_id).first()
            challenge_name = challenge.name if challenge else None
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
        submission_response.append(resp)

    # logging.info(f"[*] Submission list >> {submission_response}")

    # [TODO] Sort Submission

    return submission_response[::-1]