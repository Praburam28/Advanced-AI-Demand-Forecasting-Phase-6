from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class OrganizationSettings(Base):
    __tablename__ = "organization_settings"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        unique=True,
        index=True
    )

    timezone = Column(String(100), default="Asia/Kolkata")
    currency = Column(String(20), default="INR")
    date_format = Column(String(50), default="DD-MM-YYYY")

    forecast_frequency = Column(String(50), default="monthly")
    approval_required = Column(Boolean, default=True)

    email_notifications = Column(Boolean, default=False)
    in_app_notifications = Column(Boolean, default=True)

    data_retention_days = Column(Integer, default=365)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)