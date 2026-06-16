from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DataQualityCreate(BaseModel):
    organization_id: int
    dataset_id: int
    quality_score: float = 0
    missing_values: int = 0
    duplicate_rows: int = 0
    total_rows: int = 0
    total_columns: int = 0
    status: str = "pending"
    validation_summary: Optional[str] = None

class DataQualityResponse(BaseModel):
    id: int
    organization_id: int
    dataset_id: int
    quality_score: float
    missing_values: int
    duplicate_rows: int
    total_rows: int
    total_columns: int
    status: str
    validation_summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True