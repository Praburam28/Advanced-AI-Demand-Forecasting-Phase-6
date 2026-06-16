from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.governance_schema import (
    GovernanceCreate,
    GovernanceUpdate,
    GovernanceResponse
)
from app.services.governance_service import (
    create_governance_record,
    get_governance_records,
    get_governance_by_forecast,
    update_governance_record,
    get_governance_summary
)

router = APIRouter(
    prefix="/api/governance",
    tags=["Forecast Governance Center"]
)

@router.post("/", response_model=GovernanceResponse)
def create(data: GovernanceCreate, db: Session = Depends(get_db)):
    return create_governance_record(db, data)

@router.get("/{organization_id}", response_model=List[GovernanceResponse])
def list_records(organization_id: int, db: Session = Depends(get_db)):
    return get_governance_records(db, organization_id)

@router.get("/forecast/{forecast_id}", response_model=List[GovernanceResponse])
def forecast_history(forecast_id: int, db: Session = Depends(get_db)):
    return get_governance_by_forecast(db, forecast_id)

@router.put("/{record_id}", response_model=GovernanceResponse)
def update(record_id: int, data: GovernanceUpdate, db: Session = Depends(get_db)):
    record = update_governance_record(db, record_id, data)

    if not record:
        raise HTTPException(status_code=404, detail="Governance record not found")

    return record

@router.get("/summary/{organization_id}")
def summary(organization_id: int, db: Session = Depends(get_db)):
    return get_governance_summary(db, organization_id)