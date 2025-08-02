from pydantic import BaseModel

class SubmissionResponse(BaseModel):
    id: int
    user_id: int
    comment: str
    submitted_flag: str
    solve_time: str

    class Config:
        from_attributes = True
