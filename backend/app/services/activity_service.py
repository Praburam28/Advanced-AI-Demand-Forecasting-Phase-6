from sqlalchemy.orm import Session
from app.models.project_activity import ProjectActivity

def log_activity(db: Session, project_id: int, user_id: int, action: str, description: str = None):
    activity = ProjectActivity(
        project_id=project_id,
        user_id=user_id,
        action=action,
        description=description
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_project_activities(db: Session, project_id: int):
    return db.query(ProjectActivity).filter(
        ProjectActivity.project_id == project_id
    ).order_by(ProjectActivity.created_at.desc()).all()