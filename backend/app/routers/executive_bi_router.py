from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.executive_bi_service import get_executive_bi_summary

router = APIRouter(
    prefix="/api/executive-bi",
    tags=["Executive BI Charts"]
)


@router.get("/{organization_id}")
def executive_bi(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_executive_bi_summary(db, organization_id)