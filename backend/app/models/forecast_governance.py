from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class ForecastGovernance(Base):
    __tablename__ = "forecast_governance"

    id = Column(Integer, primary_key=True, index=True)

    forecast_id = Column(Integer, ForeignKey("forecasts.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)

    version = Column(String(50), default="v1")
    lifecycle_status = Column(String(50), default="draft")
    # draft, submitted, approved, rejected, archived

    change_summary = Column(Text, nullable=True)
    modified_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())