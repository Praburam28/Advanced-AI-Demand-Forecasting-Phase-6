from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.activity_service import get_project_activities
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/activities",
    tags=["Project Activities"]
)

@router.get("/project/{project_id}")
def project_activities(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_project_activities(db, project_id)