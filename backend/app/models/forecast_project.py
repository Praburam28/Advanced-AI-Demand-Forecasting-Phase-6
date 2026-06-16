from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class ForecastProject(Base):
    __tablename__ = "forecast_projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    permission_level = Column(String(50), default="owner")
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)