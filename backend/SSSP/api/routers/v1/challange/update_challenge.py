from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from SSSP.api.core.database import get_db
from SSSP.api.core.auth import get_current_user_by_jwt
from SSSP.api.models import models
from SSSP.api.models.enums.user_role import UserRole
from SSSP.api.schemas import schema_challenges
from SSSP.config import settings

from SSSP.util.file_save import save_or_update_file


import logging
import os

logging.basicConfig(level=logging.INFO)

router = APIRouter()


@router.patch("/{challenge_id}", response_model=schema_challenges.ChallengeResponse)
def update_challenge(
    challenge_id: int,
    name: str = Form(None),
    description: str = Form(None),
    points: int = Form(None),
    level: str = Form(None),
    category: str = Form(None),
    file: UploadFile = File(None),
    flag: str = Form(None),
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
):
    user = get_current_user_by_jwt(token, db)

    if user.authority != UserRole.ADMIN:
        logging.warning(f"Unauthorized attempt to update challenge by user [{user.username}]({user.id})")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update challenges",
        )

    challenge = (
        db.query(models.Challenge).filter(models.Challenge.id == challenge_id).first()
    )
    if not challenge:
        logging.warning(f"Challenge not found for update: ID {challenge_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found"
        )

    if name is not None:
        challenge.name = name
    if description is not None:
        challenge.description = description
    if points is not None:
        challenge.points = points
    if category is not None:
        challenge.category = category
    if flag is not None:
        challenge.flag = flag
    if level is not None:
        challenge.level = level

    if file:
        try:
            new_filename = f"PROB_{os.urandom(10).hex()}"
            if save_or_update_file(new_filename, file.file) == False:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to save or update file",
                )   
            
            download_url = f"{settings.backend_url}/api/v1/challenges/download/{new_filename}"
            filetype=file.content_type
            logging.info(f"File {download_url} uploaded to Storage")
            
            challenge.original_filename = file.filename
            challenge.file_path = download_url
            challenge.filetype = filetype
        except Exception as e:
            logging.error(f"Failed to upload file to S3 or generate URL: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to upload file or generate download URL",
            )

    db.commit()
    db.refresh(challenge)

    logging.info(f"[+] Challenge updated: {challenge}")
    return schema_challenges.ChallengeResponse.from_orm(challenge)
