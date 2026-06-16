from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class ModelAccuracy(Base):
    __tablename__ = "model_accuracy"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100), nullable=False)

    mae = Column(Float, default=0)
    mse = Column(Float, default=0)
    rmse = Column(Float, default=0)
    mape = Column(Float, default=0)
    r2_score = Column(Float, default=0)
    accuracy_score = Column(Float, default=0)

    forecast_id = Column(Integer, ForeignKey("forecasts.id"), nullable=True)
    project_id = Column(Integer, ForeignKey("forecast_projects.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)