from sqlalchemy.orm import Session

from app.models.kpi_trend import KPITrend
from app.schemas.kpi_trend_schema import KPITrendCreate


def create_kpi_trend(
    db: Session,
    data: KPITrendCreate
):
    variance = data.actual_value - data.forecast_value

    achievement = 0

    if data.forecast_value > 0:
        achievement = (
            data.actual_value /
            data.forecast_value
        ) * 100

    trend = KPITrend(
        organization_id=data.organization_id,
        kpi_id=data.kpi_id,
        period=data.period,
        actual_value=data.actual_value,
        forecast_value=data.forecast_value,
        variance=variance,
        achievement_percentage=achievement
    )

    db.add(trend)
    db.commit()
    db.refresh(trend)

    return trend


def get_kpi_trends(
    db: Session,
    organization_id: int
):
    return db.query(KPITrend).filter(
        KPITrend.organization_id == organization_id
    ).all()


def get_kpi_trend_chart(
    db: Session,
    kpi_id: int
):
    return db.query(KPITrend).filter(
        KPITrend.kpi_id == kpi_id
    ).order_by(
        KPITrend.created_at.asc()
    ).all()