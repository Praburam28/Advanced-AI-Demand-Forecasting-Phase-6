from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ScenarioCreate(BaseModel):
    name: str
    sales_growth: float = 0
    seasonality: float = 0
    demand_factor: float = 0
    notes: Optional[str] = None
    project_id: int

class ScenarioResponse(BaseModel):
    id: int
    name: str
    sales_growth: float
    seasonality: float
    demand_factor: float
    notes: Optional[str]
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True