from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GovernanceCreate(BaseModel):
    forecast_id: int
    organization_id: int
    version: str = "v1"
    lifecycle_status: str = "draft"
    change_summary: Optional[str] = None
    modified_by: Optional[int] = None

class GovernanceUpdate(BaseModel):
    version: Optional[str] = None
    lifecycle_status: Optional[str] = None
    change_summary: Optional[str] = None
    modified_by: Optional[int] = None

class GovernanceResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    version: str
    lifecycle_status: str
    change_summary: Optional[str]
    modified_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True