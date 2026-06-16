from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.forecast import Forecast
from app.models.forecast_comment import ForecastComment
from app.models.forecast_revision import ForecastRevision
from app.schemas.collaboration_schema import CommentCreate


def add_comment(db: Session, data: CommentCreate, current_user):
    forecast = db.query(Forecast).filter(
        Forecast.id == data.forecast_id,
        Forecast.user_id == current_user.id
    ).first()

    if not forecast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forecast not found"
        )

    comment = ForecastComment(
        forecast_id=data.forecast_id,
        user_id=current_user.id,
        comment=data.comment
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


def get_comments(db: Session, forecast_id: int, current_user):
    forecast = db.query(Forecast).filter(
        Forecast.id == forecast_id,
        Forecast.user_id == current_user.id
    ).first()

    if not forecast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forecast not found"
        )

    return db.query(ForecastComment).filter(
        ForecastComment.forecast_id == forecast_id
    ).order_by(ForecastComment.created_at.desc()).all()


def get_revision_history(db: Session, forecast_id: int, current_user):
    forecast = db.query(Forecast).filter(
        Forecast.id == forecast_id,
        Forecast.user_id == current_user.id
    ).first()

    if not forecast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forecast not found"
        )

    return db.query(ForecastRevision).filter(
        ForecastRevision.forecast_id == forecast_id
    ).order_by(ForecastRevision.created_at.desc()).all()