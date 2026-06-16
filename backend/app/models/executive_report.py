from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class ExecutiveReport(Base):
    __tablename__ = "executive_reports"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    report_type = Column(String(100), default="executive_summary")
    summary = Column(Text, nullable=True)
    file_path = Column(String(500), nullable=True)
    schedule_type = Column(String(100), nullable=True)

    project_id = Column(Integer, ForeignKey("forecast_projects.id"), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)