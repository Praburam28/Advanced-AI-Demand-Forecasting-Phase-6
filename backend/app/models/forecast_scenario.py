from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class ForecastScenario(Base):
    __tablename__ = "forecast_scenarios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    sales_growth = Column(Float, default=0)
    seasonality = Column(Float, default=0)
    demand_factor = Column(Float, default=0)
    notes = Column(Text, nullable=True)

    project_id = Column(Integer, ForeignKey("forecast_projects.id"))
    created_by = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)