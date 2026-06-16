from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.dashboard_schema import (
    DashboardWidgetCreate,
    DashboardWidgetResponse,
    DashboardFilterRequest
)
from app.services.dashboard_service import (
    create_widget,
    get_widgets,
    delete_widget,
    get_filtered_dashboard_analytics
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.post("/widgets", response_model=DashboardWidgetResponse)
def add_widget(
    data: DashboardWidgetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_widget(db, data, current_user)


@router.get("/widgets", response_model=List[DashboardWidgetResponse])
def list_widgets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_widgets(db, current_user)


@router.delete("/widgets/{widget_id}")
def remove_widget(
    widget_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_widget(db, widget_id, current_user)


@router.post("/analytics")
def dashboard_analytics(
    filters: DashboardFilterRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_filtered_dashboard_analytics(
        db,
        filters,
        current_user
    )