from sqlalchemy.orm import Session

from app.models.announcement import Announcement
from app.models.notification import Notification
from app.schemas.announcement_schema import (
    AnnouncementCreate,
    AnnouncementUpdate
)
from app.services.audit_service import create_audit_log


def create_announcement(db: Session, data: AnnouncementCreate):
    announcement = Announcement(**data.dict())

    db.add(announcement)
    db.commit()
    db.refresh(announcement)

    notification = Notification(
        organization_id=announcement.organization_id,
        title=f"Announcement: {announcement.title}",
        message=announcement.message,
        notification_type="announcement",
        is_read=False,
        user_id=None,
        role=announcement.target_role,
        is_announcement=True,
        announcement_priority=announcement.priority,
        source_module="announcement"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    create_audit_log(
        db=db,
        module="Announcement Center",
        action="CREATED",
        description=f"Announcement '{announcement.title}' created",
        organization_id=announcement.organization_id,
        user_id=announcement.created_by,
        entity_type="announcement",
        entity_id=announcement.id
    )

    return announcement


def get_announcements(db: Session, organization_id: int):
    return db.query(Announcement).filter(
        Announcement.organization_id == organization_id
    ).order_by(Announcement.id.desc()).all()


def get_active_announcements(db: Session, organization_id: int):
    return db.query(Announcement).filter(
        Announcement.organization_id == organization_id,
        Announcement.is_active == True
    ).order_by(Announcement.id.desc()).all()


def get_announcement(db: Session, announcement_id: int):
    return db.query(Announcement).filter(
        Announcement.id == announcement_id
    ).first()


def update_announcement(
    db: Session,
    announcement_id: int,
    data: AnnouncementUpdate
):
    announcement = get_announcement(db, announcement_id)

    if not announcement:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(announcement, key, value)

    db.commit()
    db.refresh(announcement)

    create_audit_log(
        db=db,
        module="Announcement Center",
        action="UPDATED",
        description=f"Announcement '{announcement.title}' updated",
        organization_id=announcement.organization_id,
        user_id=announcement.created_by,
        entity_type="announcement",
        entity_id=announcement.id
    )

    return announcement


def delete_announcement(db: Session, announcement_id: int):
    announcement = get_announcement(db, announcement_id)

    if not announcement:
        return None

    db.delete(announcement)
    db.commit()

    return announcement