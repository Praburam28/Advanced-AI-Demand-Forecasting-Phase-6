from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.executive_service import (
    get_executive_dashboard,
    generate_executive_report,
    get_executive_reports
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/executive",
    tags=["Executive Dashboard"]
)


@router.get("/dashboard")
def executive_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_dashboard(db, current_user)


@router.post("/reports")
def create_executive_report(
    report_type: str = Query("executive_summary"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_executive_report(db, current_user, report_type)


@router.get("/reports")
def list_executive_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_executive_reports(db, current_user)