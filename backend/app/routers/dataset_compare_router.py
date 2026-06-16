from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.dataset_compare_schema import DatasetCompareRequest
from app.services.dataset_compare_service import compare_dataset_versions
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/dataset-comparison",
    tags=["Dataset Comparison"]
)


@router.post("/")
def compare_versions(
    data: DatasetCompareRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return compare_dataset_versions(db, data, current_user)