from SSSP.config import settings
from fastapi import HTTPException, status

from pathlib import Path
import logging
import os 
logging.basicConfig(level=logging.INFO)

UPLOAD_DIR = Path(settings.challenge_file_path)

def save_or_update_file(filename: str, filedata) -> str:
    try:
        file_path = UPLOAD_DIR / filename
        
        if file_path.exists():
            os.remove(file_path)

        with open(file_path, "wb") as f:
            f.write(filedata.read())
    
        return True
    except Exception as e:
        logging.error(f"Failed to save or update file: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save or update file",
        )
    
def get_filepath(filename: str):
    file_path = UPLOAD_DIR / filename
    if file_path.exists():
        return file_path
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Filepath not found",
        )
def delete_file(filename: str) -> bool:
    file_path = UPLOAD_DIR / filename
    if file_path.exists():
        os.remove(file_path)
        return True
    return False
