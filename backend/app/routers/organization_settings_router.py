from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.organization_settings_schema import (
    OrganizationSettingsCreate,
    OrganizationSettingsUpdate,
    OrganizationSettingsResponse
)
from app.services.organization_settings_service import (
    create_settings,
    get_settings,
    update_settings
)

router = APIRouter(
    prefix="/api/organization-settings",
    tags=["Organization Settings"]
)


@router.post("/", response_model=OrganizationSettingsResponse)
def create(data: OrganizationSettingsCreate, db: Session = Depends(get_db)):
    return create_settings(db, data)


@router.get("/{organization_id}", response_model=OrganizationSettingsResponse)
def detail(organization_id: int, db: Session = Depends(get_db)):
    settings = get_settings(db, organization_id)

    if not settings:
        raise HTTPException(
            status_code=404,
            detail="Organization settings not found"
        )

    return settings


@router.put("/{organization_id}", response_model=OrganizationSettingsResponse)
def update(
    organization_id: int,
    data: OrganizationSettingsUpdate,
    db: Session = Depends(get_db)
):
    settings = update_settings(db, organization_id, data)

    if not settings:
        raise HTTPException(
            status_code=404,
            detail="Organization settings not found"
        )

    return settings