from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.announcement_schema import (
    AnnouncementCreate,
    AnnouncementUpdate,
    AnnouncementResponse
)
from app.services.announcement_service import (
    create_announcement,
    get_announcements,
    get_active_announcements,
    get_announcement,
    update_announcement,
    delete_announcement
)

router = APIRouter(
    prefix="/api/announcements",
    tags=["Announcement Center"]
)


@router.post("/", response_model=AnnouncementResponse)
def create(data: AnnouncementCreate, db: Session = Depends(get_db)):
    return create_announcement(db, data)


@router.get("/{organization_id}", response_model=List[AnnouncementResponse])
def list_all(organization_id: int, db: Session = Depends(get_db)):
    return get_announcements(db, organization_id)


@router.get("/active/{organization_id}", response_model=List[AnnouncementResponse])
def active(organization_id: int, db: Session = Depends(get_db)):
    return get_active_announcements(db, organization_id)


@router.get("/detail/{announcement_id}", response_model=AnnouncementResponse)
def detail(announcement_id: int, db: Session = Depends(get_db)):
    announcement = get_announcement(db, announcement_id)

    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return announcement


@router.put("/{announcement_id}", response_model=AnnouncementResponse)
def update(
    announcement_id: int,
    data: AnnouncementUpdate,
    db: Session = Depends(get_db)
):
    announcement = update_announcement(db, announcement_id, data)

    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return announcement


@router.delete("/{announcement_id}")
def delete(announcement_id: int, db: Session = Depends(get_db)):
    announcement = delete_announcement(db, announcement_id)

    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return {"message": "Announcement deleted successfully"}