from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging

# directory dependency
from SSSP.api.models.enums.user_role import UserRole
from SSSP.api.models import models
from SSSP.api.core.database import get_db
from SSSP.config import settings
from SSSP.api.core.auth import get_current_user_by_jwt

from SSSP.util.file_save import delete_file

logging.basicConfig(level=logging.INFO)

router = APIRouter()


@router.delete("/{challenge_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_challenge(
    challenge_id: int,
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
):
    user = get_current_user_by_jwt(token, db)

    if user.authority != UserRole.ADMIN:
        logging.warning(f"Unauthorized attempt to delete challenge by user [{user.username}]({user.id})")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete challenges",
        )

    challenge = (
        db.query(models.Challenge).filter(models.Challenge.id == challenge_id).first()
    )
    if not challenge:
        logging.warning(f"Challenge not found for deletion: ID {challenge_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found"
        )

    if challenge.file_path:
        try:
            logging.info(f'Trying to delete file from Storage: {challenge.file_path}')
            #if delete_file(challenge.file_path.split('/')[-1]) == False:
            #    raise HTTPException(
            #        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #        detail="Failed to save or update file",
            #    )   
            logging.info(f"Todo: delete challenge from storage")
            #logging.info(f"Deleted file from Storage: {challenge.file_path}")
        except Exception as e:
            logging.error(f"Failed to delete file from Storage: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete associated file from Storage",
            )

    db.delete(challenge)
    db.commit()

    logging.info(f"[-] Challenge deleted: ID {challenge_id}")
    return {'success':1, 'detail':"delete challenge complete"}
