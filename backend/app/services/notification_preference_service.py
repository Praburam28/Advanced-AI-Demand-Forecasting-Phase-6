from sqlalchemy.orm import Session
from app.models.notification_preference import NotificationPreference
from app.schemas.notification_preference_schema import (
    NotificationPreferenceCreate,
    NotificationPreferenceUpdate
)

def create_preference(db: Session, data: NotificationPreferenceCreate):
    pref = NotificationPreference(**data.dict())
    db.add(pref)
    db.commit()
    db.refresh(pref)
    return pref

def get_preferences(db: Session, organization_id: int):
    return db.query(NotificationPreference).filter(
        NotificationPreference.organization_id == organization_id
    ).order_by(NotificationPreference.id.desc()).all()

def get_user_preference(db: Session, user_id: int):
    return db.query(NotificationPreference).filter(
        NotificationPreference.user_id == user_id
    ).first()

def update_preference(db: Session, preference_id: int, data: NotificationPreferenceUpdate):
    pref = db.query(NotificationPreference).filter(
        NotificationPreference.id == preference_id
    ).first()

    if not pref:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(pref, key, value)

    db.commit()
    db.refresh(pref)
    return pref

def delete_preference(db: Session, preference_id: int):
    pref = db.query(NotificationPreference).filter(
        NotificationPreference.id == preference_id
    ).first()

    if not pref:
        return None

    db.delete(pref)
    db.commit()
    return pref