from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.collaboration_schema import CommentCreate, CommentResponse
from app.services.collaboration_service import (
    add_comment,
    get_comments,
    get_revision_history
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/collaboration",
    tags=["Forecast Collaboration"]
)


@router.post("/comments", response_model=CommentResponse)
def create_comment(
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return add_comment(db, data, current_user)


@router.get("/comments/{forecast_id}", response_model=List[CommentResponse])
def list_comments(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_comments(db, forecast_id, current_user)


@router.get("/revisions/{forecast_id}")
def list_revisions(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_revision_history(db, forecast_id, current_user)