from pydantic import BaseModel
from datetime import datetime


class PermissionCreate(BaseModel):
    project_id: int
    user_id: int
    role: str = "viewer"


class PermissionResponse(BaseModel):
    id: int
    project_id: int
    user_id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True