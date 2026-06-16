from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class NotificationPreference(Base):
    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    forecast_alerts = Column(Boolean, default=True)
    approval_alerts = Column(Boolean, default=True)
    report_alerts = Column(Boolean, default=True)
    workflow_alerts = Column(Boolean, default=True)
    kpi_alerts = Column(Boolean, default=True)
    data_quality_alerts = Column(Boolean, default=True)

    email_enabled = Column(Boolean, default=False)
    in_app_enabled = Column(Boolean, default=True)

    role = Column(String(50), default="analyst")

    created_at = Column(DateTime(timezone=True), server_default=func.now())