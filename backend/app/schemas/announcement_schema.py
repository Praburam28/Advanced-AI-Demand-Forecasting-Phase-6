from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AnnouncementCreate(BaseModel):
    organization_id: int
    title: str
    message: Optional[str] = None
    priority: str = "normal"
    target_role: Optional[str] = "all"
    created_by: Optional[int] = None


class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    priority: Optional[str] = None
    target_role: Optional[str] = None
    is_active: Optional[bool] = None


class AnnouncementResponse(BaseModel):
    id: int
    organization_id: int
    title: str
    message: Optional[str]
    priority: str
    target_role: Optional[str]
    is_active: bool
    created_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True