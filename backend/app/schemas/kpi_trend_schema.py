from pydantic import BaseModel
from datetime import datetime


class KPITrendCreate(BaseModel):
    organization_id: int
    kpi_id: int
    period: str
    actual_value: float
    forecast_value: float


class KPITrendResponse(BaseModel):
    id: int
    organization_id: int
    kpi_id: int
    period: str
    actual_value: float
    forecast_value: float
    variance: float
    achievement_percentage: float
    created_at: datetime

    class Config:
        from_attributes = True