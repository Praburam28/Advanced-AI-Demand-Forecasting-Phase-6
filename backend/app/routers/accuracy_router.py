from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.accuracy_service import (
    get_accuracy_dashboard,
    get_model_comparison
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/accuracy",
    tags=["Forecast Accuracy Center"]
)


@router.get("/dashboard")
def accuracy_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_accuracy_dashboard(db, current_user)


@router.get("/model-comparison")
def model_comparison(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_model_comparison(db, current_user)