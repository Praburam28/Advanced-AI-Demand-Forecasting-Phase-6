from sqlalchemy import Column, Integer, Float, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class KPI(Base):
    __tablename__ = "kpis"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)

    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)

    target_value = Column(Float, default=0)
    actual_value = Column(Float, default=0)
    forecast_value = Column(Float, default=0)

    unit = Column(String(50), nullable=True)
    period = Column(String(50), default="monthly")
    # daily, weekly, monthly, quarterly, yearly

    alert_threshold = Column(Float, nullable=True)

    status = Column(String(50), default="on_track")
    # on_track, warning, critical

    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())