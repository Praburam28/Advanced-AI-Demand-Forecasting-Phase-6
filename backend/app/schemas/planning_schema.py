from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StrategicPlanCreate(BaseModel):
    organization_id: int
    plan_name: str
    plan_type: str = "annual"
    year: int
    quarter: Optional[str] = None
    business_target: float = 0
    forecasted_demand: float = 0
    actual_demand: float = 0
    created_by: Optional[int] = None

class StrategicPlanUpdate(BaseModel):
    plan_name: Optional[str] = None
    plan_type: Optional[str] = None
    year: Optional[int] = None
    quarter: Optional[str] = None
    business_target: Optional[float] = None
    forecasted_demand: Optional[float] = None
    actual_demand: Optional[float] = None

class StrategicPlanResponse(BaseModel):
    id: int
    organization_id: int
    plan_name: str
    plan_type: str
    year: int
    quarter: Optional[str]
    business_target: float
    forecasted_demand: float
    actual_demand: float
    variance: float
    achievement_percentage: float
    recommendation: Optional[str]
    status: str
    created_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True