from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.kpi_trend_schema import (
    KPITrendCreate,
    KPITrendResponse
)

from app.services.kpi_trend_service import (
    create_kpi_trend,
    get_kpi_trends,
    get_kpi_trend_chart
)

router = APIRouter(
    prefix="/api/kpi-trends",
    tags=["KPI Trends"]
)


@router.post("/", response_model=KPITrendResponse)
def create(
    data: KPITrendCreate,
    db: Session = Depends(get_db)
):
    return create_kpi_trend(db, data)


@router.get(
    "/organization/{organization_id}",
    response_model=List[KPITrendResponse]
)
def organization_trends(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_kpi_trends(
        db,
        organization_id
    )


@router.get(
    "/chart/{kpi_id}",
    response_model=List[KPITrendResponse]
)
def chart_data(
    kpi_id: int,
    db: Session = Depends(get_db)
):
    return get_kpi_trend_chart(
        db,
        kpi_id
    )