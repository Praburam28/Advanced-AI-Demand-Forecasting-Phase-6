from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class ReportSchedule(Base):
    __tablename__ = "report_schedules"

    id = Column(Integer, primary_key=True, index=True)

    report_type = Column(String(100), default="executive_summary")
    schedule_frequency = Column(String(50), default="monthly")
    # daily, weekly, monthly

    delivery_format = Column(String(50), default="pdf")
    # pdf, excel

    recipient_email = Column(String(150), nullable=True)
    is_active = Column(Boolean, default=True)

    project_id = Column(Integer, ForeignKey("forecast_projects.id"), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)