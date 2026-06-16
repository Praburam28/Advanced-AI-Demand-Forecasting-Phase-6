from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.data_quality_schema import (
    DataQualityCreate,
    DataQualityResponse
)
from app.services.data_quality_service import (
    create_data_quality_record,
    get_data_quality_records,
    get_dataset_quality,
    get_data_quality_summary
)

router = APIRouter(
    prefix="/api/data-quality",
    tags=["Data Quality Management"]
)

@router.post("/", response_model=DataQualityResponse)
def create(data: DataQualityCreate, db: Session = Depends(get_db)):
    return create_data_quality_record(db, data)

@router.get("/{organization_id}", response_model=List[DataQualityResponse])
def list_records(organization_id: int, db: Session = Depends(get_db)):
    return get_data_quality_records(db, organization_id)

@router.get("/dataset/{dataset_id}", response_model=DataQualityResponse)
def dataset_quality(dataset_id: int, db: Session = Depends(get_db)):
    record = get_dataset_quality(db, dataset_id)

    if not record:
        raise HTTPException(status_code=404, detail="Data quality record not found")

    return record

@router.get("/summary/{organization_id}")
def summary(organization_id: int, db: Session = Depends(get_db)):
    return get_data_quality_summary(db, organization_id)