from sqlalchemy import Column, Integer, Float, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class DataQuality(Base):
    __tablename__ = "data_quality_scores"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False)

    quality_score = Column(Float, default=0)
    missing_values = Column(Integer, default=0)
    duplicate_rows = Column(Integer, default=0)
    total_rows = Column(Integer, default=0)
    total_columns = Column(Integer, default=0)

    status = Column(String(50), default="pending")
    # good, warning, poor

    validation_summary = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())