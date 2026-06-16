from pydantic import BaseModel
from datetime import datetime


class ReportShareCreate(BaseModel):
    report_id: int
    shared_with: int
    access_level: str = "viewer"


class ReportShareResponse(BaseModel):
    id: int
    report_id: int
    shared_by: int
    shared_with: int
    access_level: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True