from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.forecast_project import ForecastProject
from app.schemas.workspace_schema import ProjectCreate
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


def create_project(db: Session, data: ProjectCreate, current_user):
    project = ForecastProject(
        name=data.name,
        description=data.description,
        owner_id=current_user.id,
        permission_level="owner",
        status="active"
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    log_activity(
        db,
        project.id,
        current_user.id,
        "Project Created",
        f"Workspace '{project.name}' was created"
    )

    return project


def get_projects(db: Session, current_user):
    return db.query(ForecastProject).filter(
        ForecastProject.owner_id == current_user.id,
        ForecastProject.status != "deleted"
    ).all()


def get_project_by_id(db: Session, project_id: int, current_user):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id,
        ForecastProject.owner_id == current_user.id,
        ForecastProject.status != "deleted"
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return project


def update_project(db: Session, project_id: int, data: ProjectCreate, current_user):
    project = get_project_by_id(db, project_id, current_user)

    old_name = project.name

    project.name = data.name
    project.description = data.description

    db.commit()
    db.refresh(project)

    log_activity(
        db,
        project.id,
        current_user.id,
        "Project Updated",
        f"Workspace changed from '{old_name}' to '{project.name}'"
    )

    return project


def delete_project(db: Session, project_id: int, current_user):
    project = get_project_by_id(db, project_id, current_user)

    project.status = "deleted"

    db.commit()

    log_activity(
        db,
        project.id,
        current_user.id,
        "Project Deleted",
        f"Workspace '{project.name}' was deleted"
    )

    return success_response(
        "Project deleted successfully"
    )