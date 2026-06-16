from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.db import Base

class ForecastApproval(Base):
    __tablename__ = "forecast_approvals"

    id = Column(Integer, primary_key=True, index=True)

    forecast_id = Column(Integer, ForeignKey("forecasts.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)

    submitted_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewed_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    status = Column(String(50), default="pending")
    # pending, approved, rejected, revision_required

    comments = Column(Text, nullable=True)

    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime(timezone=True), nullable=True)