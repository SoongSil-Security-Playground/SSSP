from fastapi import APIRouter, Depends, HTTPException, status
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

STATUS_CORRECT = 0
STATUS_WRONG = 1
STATUS_ALREADY_SOLVE = 2

@router.delete("/delete/{submission_id}")
def delete_submission(
    submission_id: int,
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = get_current_user_by_jwt(token, db)

    if user.authority != UserRole.ADMIN:
        logging.warning(f"Unauthorized attempt to delete submission by user [{user.username}]({user.id})")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete submission",
        )


    submission = (
        db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    )

    if not submission:
        logging.warning(f"Submission not found for deletion")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found"
        )
    
    if submission.status == STATUS_CORRECT:
        # delete solved count from challenge
        challenge = db.query(models.Challenge).filter(models.Challenge.id == submission.challenge_id).first()
        if challenge and challenge.solve_count > 0:
            challenge.solve_count -= 1
            logging.info(f"[-] Decreased solve count for Challenge ID {challenge.id} to {challenge.solve_count}")


            if challenge.is_dynamic == True:
                minimum = challenge.minimum_points
                initial = challenge.initial_points
                decay   = challenge.decay
                solve_count = challenge.solve_count

                new_point = int((((minimum - initial) / (decay ** 2)) * (solve_count ** 2)) + initial)
                logging.info("New Dynamic Point! : " + str(new_point))
                challenge.points = new_point

        # delete solved_challenge from user
        submission_user = db.query(models.User).filter(models.User.id == submission.user_id).first()
        if submission_user and submission_user.solved_challenge:
            # solved_challenge는 JSON 필드이므로 리스트로 변환 후 처리
            solved_challenges = list(submission_user.solved_challenge) if submission_user.solved_challenge else []
            if submission.challenge_id in solved_challenges:
                solved_challenges.remove(submission.challenge_id)
                submission_user.solved_challenge = solved_challenges
                logging.info(f"[-] Removed Challenge ID {submission.challenge_id} from User ID {submission_user.id} solved challenges")
                
    db.delete(submission)
    db.commit()

    logging.info(f"[-] Submission Deleted: ID {submission_id}")
    return {'success':1}