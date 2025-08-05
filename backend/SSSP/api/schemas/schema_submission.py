from pydantic import BaseModel
from datetime import datetime

class SubmissionResponse(BaseModel):
    id: int
    user_id: int
    submitted_flag: str
    submit_time: datetime
    status: int

    class Config:
        from_attributes = True
