from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.notification_preference_schema import (
    NotificationPreferenceCreate,
    NotificationPreferenceUpdate,
    NotificationPreferenceResponse
)
from app.services.notification_preference_service import (
    create_preference,
    get_preferences,
    get_user_preference,
    update_preference,
    delete_preference
)

router = APIRouter(
    prefix="/api/notification-preferences",
    tags=["Notification Center Enhancements"]
)

@router.post("/", response_model=NotificationPreferenceResponse)
def create(data: NotificationPreferenceCreate, db: Session = Depends(get_db)):
    return create_preference(db, data)

@router.get("/{organization_id}", response_model=List[NotificationPreferenceResponse])
def list_all(organization_id: int, db: Session = Depends(get_db)):
    return get_preferences(db, organization_id)

@router.get("/user/{user_id}", response_model=NotificationPreferenceResponse)
def user_preference(user_id: int, db: Session = Depends(get_db)):
    pref = get_user_preference(db, user_id)

    if not pref:
        raise HTTPException(status_code=404, detail="Notification preference not found")

    return pref

@router.put("/{preference_id}", response_model=NotificationPreferenceResponse)
def update(
    preference_id: int,
    data: NotificationPreferenceUpdate,
    db: Session = Depends(get_db)
):
    pref = update_preference(db, preference_id, data)

    if not pref:
        raise HTTPException(status_code=404, detail="Notification preference not found")

    return pref

@router.delete("/{preference_id}")
def delete(preference_id: int, db: Session = Depends(get_db)):
    pref = delete_preference(db, preference_id)

    if not pref:
        raise HTTPException(status_code=404, detail="Notification preference not found")

    return {"message": "Notification preference deleted successfully"}