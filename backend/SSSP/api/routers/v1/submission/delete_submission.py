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
    
    db.delete(submission)
    db.commit()

    logging.info(f"[-] Submission Deleted: ID {submission_id}")
    return {'success':1}