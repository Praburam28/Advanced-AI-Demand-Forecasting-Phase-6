from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.notification_schema import NotificationResponse
from app.services.notification_service import (
    get_notifications,
    mark_notification_read
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/notifications",
    tags=["Notifications"]
)


@router.get("/", response_model=List[NotificationResponse])
def list_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notifications(db, current_user)


@router.put("/{notification_id}/read")
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return mark_notification_read(db, notification_id, current_user)