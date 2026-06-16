from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(Integer, primary_key=True, index=True)

    model_name = Column(String(100), nullable=False)
    forecast_period = Column(Integer, default=30)

    predicted_demand = Column(Float, default=0)
    revenue_forecast = Column(Float, default=0)
    profit_forecast = Column(Float, default=0)
    cost_forecast = Column(Float, default=0)

    mae = Column(Float, default=0)
    mse = Column(Float, default=0)
    rmse = Column(Float, default=0)
    mape = Column(Float, default=0)
    r2_score = Column(Float, default=0)

    ai_summary = Column(Text, nullable=True)
    recommendation = Column(Text, nullable=True)

    dataset_id = Column(Integer, ForeignKey("datasets.id"))
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), nullable=True)
    scenario_id = Column(Integer, ForeignKey("forecast_scenarios.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # PHASE 6: Multi-Organization Isolation
    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    # Approval tracking
    approval_status = Column(String(50), default="draft")
    # draft, pending, approved, rejected, revision_required

    created_at = Column(DateTime, default=datetime.utcnow)