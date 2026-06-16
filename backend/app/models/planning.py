from sqlalchemy import Column, Integer, Float, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class StrategicPlan(Base):
    __tablename__ = "strategic_plans"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)

    plan_name = Column(String(150), nullable=False)
    plan_type = Column(String(50), default="annual")
    # annual, quarterly

    year = Column(Integer, nullable=False)
    quarter = Column(String(10), nullable=True)
    # Q1, Q2, Q3, Q4

    business_target = Column(Float, default=0)
    forecasted_demand = Column(Float, default=0)
    actual_demand = Column(Float, default=0)

    variance = Column(Float, default=0)
    achievement_percentage = Column(Float, default=0)

    recommendation = Column(Text, nullable=True)

    status = Column(String(50), default="on_track")
    # on_track, at_risk, behind_target

    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())