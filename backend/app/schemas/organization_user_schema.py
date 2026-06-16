from pydantic import BaseModel
from datetime import datetime

class OrganizationUserCreate(BaseModel):
    organization_id: int
    user_id: int
    role: str = "analyst"

class OrganizationUserResponse(BaseModel):
    id: int
    organization_id: int
    user_id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True