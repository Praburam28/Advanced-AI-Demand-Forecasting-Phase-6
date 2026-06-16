from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class ReportShare(Base):
    __tablename__ = "report_shares"

    id = Column(Integer, primary_key=True, index=True)

    report_id = Column(Integer, ForeignKey("reports.id"))
    shared_by = Column(Integer, ForeignKey("users.id"))
    shared_with = Column(Integer, ForeignKey("users.id"))

    access_level = Column(String(50), default="viewer")
    # viewer, editor

    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)