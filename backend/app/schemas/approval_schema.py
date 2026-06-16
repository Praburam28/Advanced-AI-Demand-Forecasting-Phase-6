from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ForecastApprovalCreate(BaseModel):
    forecast_id: int
    organization_id: int
    submitted_by: int
    comments: Optional[str] = None

class ForecastApprovalReview(BaseModel):
    reviewed_by: int
    status: str
    comments: Optional[str] = None

class ForecastApprovalResponse(BaseModel):
    id: int
    forecast_id: int
    organization_id: int
    submitted_by: int
    reviewed_by: Optional[int]
    status: str
    comments: Optional[str]
    submitted_at: datetime
    reviewed_at: Optional[datetime]

    class Config:
        from_attributes = True