# schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# directory dependency

class ChallengeBase(BaseModel):
    name: str = Field(..., max_length=255)
    description: str
    points: int
    category: str

class ChallengeUpdate(ChallengeBase):
    file_path: Optional[str] = None

class ChallengeResponse(ChallengeBase):
    id: int
    created_at: datetime
    file_path: Optional[str] = None
    category: str
    solve_count: int
    level: str
    flag: str
    is_user_solved: Optional[int] = 0  # 0: not solved, 1: solved
    
    class Config:
        from_attributes = True
