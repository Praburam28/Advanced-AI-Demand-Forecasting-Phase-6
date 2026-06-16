from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.permission_schema import PermissionCreate, PermissionResponse
from app.services.permission_service import (
    add_project_permission,
    list_project_permissions,
    remove_project_permission
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/permissions",
    tags=["Project Permissions"]
)


@router.post("/", response_model=PermissionResponse)
def add_permission(
    data: PermissionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return add_project_permission(db, data, current_user)


@router.get("/project/{project_id}", response_model=List[PermissionResponse])
def get_permissions(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return list_project_permissions(db, project_id, current_user)


@router.delete("/{permission_id}")
def delete_permission(
    permission_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return remove_project_permission(db, permission_id, current_user)