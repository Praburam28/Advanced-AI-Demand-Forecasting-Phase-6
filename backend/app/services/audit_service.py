from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog

def create_audit_log(
    db: Session,
    module: str,
    action: str,
    description: str = None,
    organization_id: int = None,
    user_id: int = None,
    entity_type: str = None,
    entity_id: int = None
):
    log = AuditLog(
        organization_id=organization_id,
        user_id=user_id,
        module=module,
        action=action,
        description=description,
        entity_type=entity_type,
        entity_id=entity_id
    )

    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def get_audit_logs(db: Session, organization_id: int = None):
    query = db.query(AuditLog)

    if organization_id:
        query = query.filter(AuditLog.organization_id == organization_id)

    return query.order_by(AuditLog.id.desc()).all()