from datetime import datetime
from sqlalchemy.orm import Session

from app.models.organization_settings import OrganizationSettings
from app.schemas.organization_settings_schema import (
    OrganizationSettingsCreate,
    OrganizationSettingsUpdate
)
from app.services.audit_service import create_audit_log


def create_settings(db: Session, data: OrganizationSettingsCreate):
    existing = db.query(OrganizationSettings).filter(
        OrganizationSettings.organization_id == data.organization_id
    ).first()

    if existing:
        return existing

    settings = OrganizationSettings(**data.dict())

    db.add(settings)
    db.commit()
    db.refresh(settings)

    create_audit_log(
        db=db,
        module="Organization Settings",
        action="CREATED",
        description="Organization settings created",
        organization_id=settings.organization_id,
        entity_type="organization_settings",
        entity_id=settings.id
    )

    return settings


def get_settings(db: Session, organization_id: int):
    return db.query(OrganizationSettings).filter(
        OrganizationSettings.organization_id == organization_id
    ).first()


def update_settings(
    db: Session,
    organization_id: int,
    data: OrganizationSettingsUpdate
):
    settings = get_settings(db, organization_id)

    if not settings:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(settings, key, value)

    settings.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(settings)

    create_audit_log(
        db=db,
        module="Organization Settings",
        action="UPDATED",
        description="Organization settings updated",
        organization_id=settings.organization_id,
        entity_type="organization_settings",
        entity_id=settings.id
    )

    return settings