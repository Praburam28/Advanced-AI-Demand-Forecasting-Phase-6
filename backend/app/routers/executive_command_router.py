from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.executive_command_service import get_executive_command_summary

router = APIRouter(
    prefix="/api/executive-command",
    tags=["Executive Command Center"]
)

@router.get("/{organization_id}")
def executive_summary(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_executive_command_summary(db, organization_id)