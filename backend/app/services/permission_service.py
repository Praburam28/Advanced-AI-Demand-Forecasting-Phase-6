from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.forecast_project import ForecastProject
from app.models.project_permission import ProjectPermission
from app.models.user import User
from app.schemas.permission_schema import PermissionCreate
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


VALID_ROLES = ["owner", "admin", "editor", "viewer"]


def get_user_project_role(db: Session, project_id: int, user_id: int):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id,
        ForecastProject.status != "deleted"
    ).first()

    if not project:
        return None

    if project.owner_id == user_id:
        return "owner"

    permission = db.query(ProjectPermission).filter(
        ProjectPermission.project_id == project_id,
        ProjectPermission.user_id == user_id
    ).first()

    return permission.role if permission else None


def require_project_role(db: Session, project_id: int, user_id: int, allowed_roles):
    role = get_user_project_role(db, project_id, user_id)

    if role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action"
        )

    return role


def add_project_permission(db: Session, data: PermissionCreate, current_user):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == data.project_id,
        ForecastProject.status != "deleted"
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    require_project_role(
        db,
        data.project_id,
        current_user.id,
        ["owner", "admin"]
    )

    if data.role not in VALID_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid permission role"
        )

    user = db.query(User).filter(User.id == data.user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    existing = db.query(ProjectPermission).filter(
        ProjectPermission.project_id == data.project_id,
        ProjectPermission.user_id == data.user_id
    ).first()

    if existing:
        existing.role = data.role
        db.commit()
        db.refresh(existing)

        log_activity(
            db,
            data.project_id,
            current_user.id,
            "Permission Updated",
            f"User #{data.user_id} permission changed to {data.role}"
        )

        return existing

    permission = ProjectPermission(
        project_id=data.project_id,
        user_id=data.user_id,
        role=data.role
    )

    db.add(permission)
    db.commit()
    db.refresh(permission)

    log_activity(
        db,
        data.project_id,
        current_user.id,
        "Permission Added",
        f"User #{data.user_id} added as {data.role}"
    )

    return permission


def list_project_permissions(db: Session, project_id: int, current_user):
    require_project_role(
        db,
        project_id,
        current_user.id,
        ["owner", "admin"]
    )

    return db.query(ProjectPermission).filter(
        ProjectPermission.project_id == project_id
    ).all()


def remove_project_permission(db: Session, permission_id: int, current_user):
    permission = db.query(ProjectPermission).filter(
        ProjectPermission.id == permission_id
    ).first()

    if not permission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Permission not found"
        )

    require_project_role(
        db,
        permission.project_id,
        current_user.id,
        ["owner", "admin"]
    )

    project_id = permission.project_id
    user_id = permission.user_id

    db.delete(permission)
    db.commit()

    log_activity(
        db,
        project_id,
        current_user.id,
        "Permission Removed",
        f"User #{user_id} permission was removed"
    )

    return success_response("Project permission removed successfully")