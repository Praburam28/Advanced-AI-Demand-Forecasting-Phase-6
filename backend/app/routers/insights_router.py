from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.insights_service import (
    get_ai_insights,
    get_declining_products,
    get_high_growth_products
)

from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/insights",
    tags=["AI Insights"]
)


@router.get("/")
def ai_insights(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_ai_insights(db, current_user)


@router.get("/declining-products")
def declining_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_declining_products(db, current_user)


@router.get("/high-growth-products")
def high_growth_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_high_growth_products(db, current_user)