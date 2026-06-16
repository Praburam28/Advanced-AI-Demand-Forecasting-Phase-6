from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.utils.response_handler import success_response


def create_notification(
    db: Session,
    user_id: int,
    title: str,
    message: str,
    notification_type: str = "info"
):
    notification = Notification(
        title=title,
        message=message,
        notification_type=notification_type,
        user_id=user_id
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(db: Session, current_user):
    return db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).order_by(Notification.created_at.desc()).all()


def mark_notification_read(db: Session, notification_id: int, current_user):
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()

    if not notification:
        return success_response("Notification not found")

    notification.is_read = True
    db.commit()

    return success_response("Notification marked as read")