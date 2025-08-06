from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class SubmissionResponse(BaseModel):
    id: int
    user_id: int
    username: Optional[str]
    challenge_id: Optional[int]
    challenge_name: Optional[str]
    submitted_flag: str
    submit_time: datetime
    status: int

    class Config:
        from_attributes = True