from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.workspace_schema import ProjectCreate, ProjectResponse
from app.services.workspace_service import (
    create_project,
    get_projects,
    get_project_by_id,
    update_project,
    delete_project
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/workspaces",
    tags=["Forecast Workspace"]
)


@router.post("/", response_model=ProjectResponse)
def create_workspace(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_project(db, data, current_user)


@router.get("/", response_model=List[ProjectResponse])
def list_workspaces(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_projects(db, current_user)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_workspace(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_project_by_id(db, project_id, current_user)


@router.put("/{project_id}", response_model=ProjectResponse)
def edit_workspace(
    project_id: int,
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_project(db, project_id, data, current_user)


@router.delete("/{project_id}")
def remove_workspace(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_project(db, project_id, current_user)