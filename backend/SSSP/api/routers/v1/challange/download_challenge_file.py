from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form, Request
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from SSSP.api.core.database import get_db
from SSSP.api.core.auth import get_current_user_by_jwt
from SSSP.api.models import models
from SSSP.config import settings
from SSSP.api.models.enums.user_role import UserRole
from SSSP.api.schemas import schema_challenges

from SSSP.util.file_save import get_filepath
from typing import Optional
import logging
import os

logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.get(
    "/{file_path}",
    status_code=status.HTTP_200_OK,
)
def download_challenge_file(
    file_path: str,
    request: Request,
    # token: str = Depends(settings.oauth2_scheme),
    db: Session = Depends(get_db),
):
    # user = get_current_user_by_jwt(token, db)

    challenge = (
        db.query(models.Challenge).filter(models.Challenge.file_path == request.url).first()
    )
    
    if not challenge:
        logging.warning(f"Challenge not found: Path {file_path}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found"
        )
    
    file_name = challenge.file_path.split('/')[-1]
    file_path = get_filepath(file_name)
    return FileResponse(file_path, media_type=challenge.filetype, headers={"Content-Disposition": f"attachment; filename={challenge.original_filename}"})