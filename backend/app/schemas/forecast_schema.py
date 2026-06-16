from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ForecastCreate(BaseModel):
    dataset_id: int
    project_id: Optional[int] = None
    scenario_id: Optional[int] = None
    model_name: str = "Random Forest"
    forecast_period: int = 30

class ForecastResponse(BaseModel):
    id: int
    model_name: str
    forecast_period: int
    predicted_demand: float
    revenue_forecast: float
    profit_forecast: float
    cost_forecast: float
    mae: float
    mse: float
    rmse: float
    mape: float
    r2_score: float
    ai_summary: Optional[str]
    recommendation: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True