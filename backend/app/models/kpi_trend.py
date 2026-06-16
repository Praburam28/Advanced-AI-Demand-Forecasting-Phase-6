from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)
from datetime import datetime

from app.database.db import Base


class KPITrend(Base):
    __tablename__ = "kpi_trends"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    kpi_id = Column(
        Integer,
        ForeignKey("kpis.id"),
        nullable=False
    )

    period = Column(String(50), nullable=False)
    # Jan-2026, Q1-2026, etc

    actual_value = Column(Float, default=0)

    forecast_value = Column(Float, default=0)

    variance = Column(Float, default=0)

    achievement_percentage = Column(Float, default=0)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )