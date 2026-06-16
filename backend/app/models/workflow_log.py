from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class WorkflowLog(Base):
    __tablename__ = "workflow_logs"

    id = Column(Integer, primary_key=True, index=True)

    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)

    status = Column(String(50), default="success")
    message = Column(Text, nullable=True)

    executed_at = Column(DateTime, default=datetime.utcnow)