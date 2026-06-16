from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.audit_schema import AuditLogResponse
from app.services.audit_service import get_audit_logs

router = APIRouter(
    prefix="/api/audit-logs",
    tags=["Audit Logs"]
)

@router.get("/", response_model=List[AuditLogResponse])
def list_logs(
    organization_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    return get_audit_logs(db, organization_id)