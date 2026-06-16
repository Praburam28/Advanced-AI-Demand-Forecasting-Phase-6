from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.organization_user_schema import (
    OrganizationUserCreate,
    OrganizationUserResponse
)
from app.services.organization_user_service import (
    add_user_to_organization,
    get_organization_users,
    remove_user_from_organization
)

router = APIRouter(
    prefix="/api/organization-users",
    tags=["Organization Users"]
)

@router.post("/", response_model=OrganizationUserResponse)
def add_user(data: OrganizationUserCreate, db: Session = Depends(get_db)):
    return add_user_to_organization(db, data)

@router.get("/{organization_id}", response_model=List[OrganizationUserResponse])
def list_users(organization_id: int, db: Session = Depends(get_db)):
    return get_organization_users(db, organization_id)

@router.delete("/{org_user_id}")
def delete_user(org_user_id: int, db: Session = Depends(get_db)):
    result = remove_user_from_organization(db, org_user_id)

    if not result:
        raise HTTPException(status_code=404, detail="Organization user not found")

    return {"message": "User removed from organization successfully"}