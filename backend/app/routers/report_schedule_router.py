from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.report_schedule_schema import (
    ReportScheduleCreate,
    ReportScheduleResponse
)
from app.services.report_schedule_service import (
    create_report_schedule,
    get_report_schedules,
    toggle_report_schedule,
    delete_report_schedule
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/report-schedules",
    tags=["Report Scheduling"]
)


@router.post("/", response_model=ReportScheduleResponse)
def create_schedule(
    data: ReportScheduleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_report_schedule(db, data, current_user)


@router.get("/", response_model=List[ReportScheduleResponse])
def list_schedules(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_report_schedules(db, current_user)


@router.put("/{schedule_id}/toggle", response_model=ReportScheduleResponse)
def toggle_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return toggle_report_schedule(db, schedule_id, current_user)


@router.delete("/{schedule_id}")
def remove_schedule(
    schedule_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_report_schedule(db, schedule_id, current_user)