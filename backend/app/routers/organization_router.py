from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.organization_schema import (
    OrganizationCreate,
    OrganizationUpdate,
    OrganizationResponse
)
from app.services.organization_service import (
    create_organization,
    get_organizations,
    get_organization,
    update_organization,
    delete_organization
)

router = APIRouter(
    prefix="/api/organizations",
    tags=["Organizations"]
)

@router.post("/", response_model=OrganizationResponse)
def create(data: OrganizationCreate, db: Session = Depends(get_db)):
    return create_organization(db, data)

@router.get("/", response_model=List[OrganizationResponse])
def list_all(db: Session = Depends(get_db)):
    return get_organizations(db)

@router.get("/{org_id}", response_model=OrganizationResponse)
def detail(org_id: int, db: Session = Depends(get_db)):
    org = get_organization(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@router.put("/{org_id}", response_model=OrganizationResponse)
def update(org_id: int, data: OrganizationUpdate, db: Session = Depends(get_db)):
    org = update_organization(db, org_id, data)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@router.delete("/{org_id}")
def delete(org_id: int, db: Session = Depends(get_db)):
    org = delete_organization(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return {"message": "Organization deleted successfully"}