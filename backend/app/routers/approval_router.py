from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.approval_schema import (
    ForecastApprovalCreate,
    ForecastApprovalReview,
    ForecastApprovalResponse
)
from app.services.approval_service import (
    submit_forecast_for_approval,
    get_approvals,
    get_approval_by_id,
    review_forecast_approval
)

router = APIRouter(
    prefix="/api/forecast-approvals",
    tags=["Forecast Approval Workflow"]
)

@router.post("/", response_model=ForecastApprovalResponse)
def submit(data: ForecastApprovalCreate, db: Session = Depends(get_db)):
    return submit_forecast_for_approval(db, data)

@router.get("/{organization_id}", response_model=List[ForecastApprovalResponse])
def list_approvals(organization_id: int, db: Session = Depends(get_db)):
    return get_approvals(db, organization_id)

@router.get("/detail/{approval_id}", response_model=ForecastApprovalResponse)
def detail(approval_id: int, db: Session = Depends(get_db)):
    approval = get_approval_by_id(db, approval_id)

    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")

    return approval

@router.put("/{approval_id}/review", response_model=ForecastApprovalResponse)
def review(
    approval_id: int,
    data: ForecastApprovalReview,
    db: Session = Depends(get_db)
):
    approval = review_forecast_approval(db, approval_id, data)

    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")

    return approval