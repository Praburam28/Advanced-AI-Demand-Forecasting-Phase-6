from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.report_share_schema import (
    ReportShareCreate,
    ReportShareResponse
)
from app.services.report_share_service import (
    share_report,
    get_shared_reports,
    get_report_shares,
    revoke_report_share
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/report-sharing",
    tags=["Report Sharing"]
)


@router.post("/", response_model=ReportShareResponse)
def share_report_api(
    data: ReportShareCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return share_report(db, data, current_user)


@router.get("/shared-with-me", response_model=List[ReportShareResponse])
def shared_with_me(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_shared_reports(db, current_user)


@router.get("/report/{report_id}", response_model=List[ReportShareResponse])
def report_shares(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_report_shares(db, report_id, current_user)


@router.delete("/{share_id}")
def revoke_share(
    share_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return revoke_report_share(db, share_id, current_user)