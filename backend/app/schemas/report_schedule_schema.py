from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ReportScheduleCreate(BaseModel):
    report_type: str = "executive_summary"
    schedule_frequency: str = "monthly"
    delivery_format: str = "pdf"
    recipient_email: Optional[EmailStr] = None
    project_id: Optional[int] = None


class ReportScheduleResponse(BaseModel):
    id: int
    report_type: str
    schedule_frequency: str
    delivery_format: str
    recipient_email: Optional[str]
    is_active: bool
    project_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True