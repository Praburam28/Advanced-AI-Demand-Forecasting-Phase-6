from sqlalchemy.orm import Session
from app.models.forecast_governance import ForecastGovernance
from app.schemas.governance_schema import GovernanceCreate, GovernanceUpdate
from app.services.audit_service import create_audit_log

def create_governance_record(db: Session, data: GovernanceCreate):
    record = ForecastGovernance(**data.dict())

    db.add(record)
    db.commit()
    db.refresh(record)

    create_audit_log(
        db=db,
        module="Forecast Governance",
        action="CREATED",
        description=f"Governance record created for forecast {record.forecast_id}",
        organization_id=record.organization_id,
        user_id=record.modified_by,
        entity_type="forecast_governance",
        entity_id=record.id
    )

    return record

def get_governance_records(db: Session, organization_id: int):
    return db.query(ForecastGovernance).filter(
        ForecastGovernance.organization_id == organization_id
    ).order_by(ForecastGovernance.id.desc()).all()

def get_governance_by_forecast(db: Session, forecast_id: int):
    return db.query(ForecastGovernance).filter(
        ForecastGovernance.forecast_id == forecast_id
    ).order_by(ForecastGovernance.id.desc()).all()

def update_governance_record(db: Session, record_id: int, data: GovernanceUpdate):
    record = db.query(ForecastGovernance).filter(
        ForecastGovernance.id == record_id
    ).first()

    if not record:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(record, key, value)

    db.commit()
    db.refresh(record)

    create_audit_log(
        db=db,
        module="Forecast Governance",
        action="UPDATED",
        description=f"Governance record {record.id} updated",
        organization_id=record.organization_id,
        user_id=record.modified_by,
        entity_type="forecast_governance",
        entity_id=record.id
    )

    return record

def get_governance_summary(db: Session, organization_id: int):
    records = db.query(ForecastGovernance).filter(
        ForecastGovernance.organization_id == organization_id
    ).all()

    return {
        "total_records": len(records),
        "draft": len([r for r in records if r.lifecycle_status == "draft"]),
        "submitted": len([r for r in records if r.lifecycle_status == "submitted"]),
        "approved": len([r for r in records if r.lifecycle_status == "approved"]),
        "rejected": len([r for r in records if r.lifecycle_status == "rejected"]),
        "archived": len([r for r in records if r.lifecycle_status == "archived"]),
    }