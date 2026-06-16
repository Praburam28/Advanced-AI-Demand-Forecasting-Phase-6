from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.forecast_schema import ForecastCreate, ForecastResponse
from app.services.forecast_service import (
    generate_forecast,
    get_forecasts,
    get_forecast_by_id,
    delete_forecast
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/forecasts",
    tags=["Forecasts"]
)


@router.post("/generate", response_model=ForecastResponse)
def create_forecast(
    data: ForecastCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_forecast(db, data, current_user)


@router.get("/", response_model=List[ForecastResponse])
def list_forecasts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_forecasts(db, current_user)


@router.get("/{forecast_id}", response_model=ForecastResponse)
def get_forecast(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_forecast_by_id(db, forecast_id, current_user)


@router.delete("/{forecast_id}")
def remove_forecast(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_forecast(db, forecast_id, current_user)