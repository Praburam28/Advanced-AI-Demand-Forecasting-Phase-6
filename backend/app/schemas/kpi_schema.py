from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class KPICreate(BaseModel):
    organization_id: int
    name: str
    description: Optional[str] = None
    target_value: float = 0
    actual_value: float = 0
    forecast_value: float = 0
    unit: Optional[str] = None
    period: str = "monthly"
    alert_threshold: Optional[float] = None
    created_by: Optional[int] = None

class KPIUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    target_value: Optional[float] = None
    actual_value: Optional[float] = None
    forecast_value: Optional[float] = None
    unit: Optional[str] = None
    period: Optional[str] = None
    alert_threshold: Optional[float] = None
    status: Optional[str] = None

class KPIResponse(BaseModel):
    id: int
    organization_id: int
    name: str
    description: Optional[str]
    target_value: float
    actual_value: float
    forecast_value: float
    unit: Optional[str]
    period: str
    alert_threshold: Optional[float]
    status: str
    created_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True