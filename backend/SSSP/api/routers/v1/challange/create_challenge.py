from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from SSSP.api.core.database import get_db
from SSSP.api.core.auth import get_current_user_by_jwt
from SSSP.api.models import models
from SSSP.config import settings
from SSSP.api.models.enums.user_role import UserRole
from SSSP.api.schemas import schema_challenges

from SSSP.util.file_save import save_or_update_file
from typing import Optional
import logging
import os

logging.basicConfig(level=logging.INFO)

router = APIRouter()


@router.post(
    "/",
    response_model=schema_challenges.ChallengeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_challenge(
    name: str = Form(...),
    description: str = Form(...),
    points: str = Form(...),
    category: str = Form(...),
    file: Optional[UploadFile] = File(None),
    flag: str = Form(...),
    level: str = Form(...),
    decay: str = Form(...),
    minimum_point: str = Form(...),
    is_dynamic: bool = Form(...),
    useDocker: bool = Form(...),
    token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
):
    user = get_current_user_by_jwt(token, db)
    if user.authority != UserRole.ADMIN:
        logging.warning(f"Unauthorized attempt to create challenge by user [{user.username}]({user.id})")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create challenges",
        )

    # S3 bucket generator for attachment
    download_url = None
    filetype = None
    original_filename = None
    if file is not None:
        new_filename = f"PROB_{os.urandom(10).hex()}"
        if save_or_update_file(new_filename, file.file) == False:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save or update file",
            )   
        
        download_url = f"{settings.backend_url}/api/v1/challenges/download/{new_filename}"
        filetype=file.content_type
        original_filename = file.filename
        logging.info(f"File {download_url} uploaded to Storage")

    try:
        points_int = int(points)
        decay_int = int(decay)
        minimum_point_int = int(minimum_point)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid numeric values provided",
        )

    db_challenge = models.Challenge(
        name=name,
        description=description,
        points=points_int,
        category=category,
        level=level,
        original_filename=original_filename,
        file_path=download_url,
        filetype=filetype,
        flag=flag,
        decay=decay_int,
        initial_points=points_int,
        minimum_points=minimum_point_int,
        is_dynamic=is_dynamic,
        useDocker=useDocker,
    )
    db.add(db_challenge)
    db.commit()
    db.refresh(db_challenge)

    logging.info(f"[+] Challenge created: {db_challenge}")

    return schema_challenges.ChallengeResponse.from_orm(db_challenge)
