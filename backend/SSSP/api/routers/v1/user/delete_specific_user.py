from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging

logging.basicConfig(level=logging.INFO)

# directory dependency
from SSSP.api.models import models
from SSSP.api.core import auth
from SSSP.config import settings
from SSSP.api.core.database import *
from SSSP.api.models.enums.user_role import UserRole


router = APIRouter()


@router.delete("/delete_user", status_code=status.HTTP_200_OK)
def delete_specific_user(
    user_id: int,
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db)
):
    logging.info(f"[*] DELETE_SPECIFIC_USER >> Request with {token}")

    user = auth.get_current_user_by_jwt(token, db)
    if user.authority != UserRole.ADMIN:
        logging.warning(f"Unauthorized attempt to delete specific user by user {user.id}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete user",
        )

    specific_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not specific_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(specific_user)
    db.commit()

    logging.info(f"User deleted successfully: ID {user_id}")
    return {"success": 1}
