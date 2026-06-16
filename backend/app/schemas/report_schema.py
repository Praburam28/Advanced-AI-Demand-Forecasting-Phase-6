from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportCreate(BaseModel):
    title: str
    report_type: str = "forecast"
    forecast_id: Optional[int] = None
    project_id: Optional[int] = None

class ReportResponse(BaseModel):
    id: int
    title: str
    report_type: str
    file_path: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True