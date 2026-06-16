from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    forecast_id: int
    comment: str

class CommentResponse(BaseModel):
    id: int
    forecast_id: int
    user_id: int
    comment: str
    created_at: datetime

    class Config:
        from_attributes = True