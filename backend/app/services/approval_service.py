from datetime import datetime
from sqlalchemy.orm import Session

from app.models.forecast_approval import ForecastApproval
from app.models.forecast import Forecast
from app.models.notification import Notification

from app.schemas.approval_schema import (
    ForecastApprovalCreate,
    ForecastApprovalReview
)

from app.services.audit_service import create_audit_log


def submit_forecast_for_approval(db: Session, data: ForecastApprovalCreate):
    approval = ForecastApproval(
        forecast_id=data.forecast_id,
        organization_id=data.organization_id,
        submitted_by=data.submitted_by,
        comments=data.comments,
        status="pending"
    )

    db.add(approval)

    forecast = db.query(Forecast).filter(
        Forecast.id == data.forecast_id
    ).first()

    if forecast:
        forecast.approval_status = "pending"

    db.commit()
    db.refresh(approval)

    create_audit_log(
        db=db,
        module="Forecast Approval",
        action="SUBMITTED",
        description=f"Forecast {approval.forecast_id} submitted for approval",
        organization_id=approval.organization_id,
        user_id=approval.submitted_by,
        entity_type="forecast_approval",
        entity_id=approval.id
    )

    notification = Notification(
        organization_id=approval.organization_id,
        title="Forecast Submitted for Approval",
        message=f"Forecast #{approval.forecast_id} is waiting for approval.",
        notification_type="approval",
        is_read=False,
        user_id=None,
        role="manager",
        is_announcement=False,
        announcement_priority="normal",
        source_module="forecast_approval"
    )

    db.add(notification)
    db.commit()

    return approval


def get_approvals(db: Session, organization_id: int):
    return db.query(ForecastApproval).filter(
        ForecastApproval.organization_id == organization_id
    ).order_by(ForecastApproval.id.desc()).all()


def get_approval_by_id(db: Session, approval_id: int):
    return db.query(ForecastApproval).filter(
        ForecastApproval.id == approval_id
    ).first()


def review_forecast_approval(
    db: Session,
    approval_id: int,
    data: ForecastApprovalReview
):
    approval = get_approval_by_id(db, approval_id)

    if not approval:
        return None

    approval.status = data.status
    approval.reviewed_by = data.reviewed_by
    approval.comments = data.comments
    approval.reviewed_at = datetime.utcnow()

    forecast = db.query(Forecast).filter(
        Forecast.id == approval.forecast_id
    ).first()

    if forecast:
        forecast.approval_status = data.status

    db.commit()
    db.refresh(approval)

    create_audit_log(
        db=db,
        module="Forecast Approval",
        action=data.status.upper(),
        description=f"Forecast approval {approval.id} marked as {data.status}",
        organization_id=approval.organization_id,
        user_id=data.reviewed_by,
        entity_type="forecast_approval",
        entity_id=approval.id
    )

    notification_title = "Forecast Approval Updated"
    notification_message = (
        f"Forecast #{approval.forecast_id} has been marked as {data.status}."
    )

    notification = Notification(
        organization_id=approval.organization_id,
        title=notification_title,
        message=notification_message,
        notification_type="approval",
        is_read=False,
        user_id=approval.submitted_by,
        role="analyst",
        is_announcement=False,
        announcement_priority="normal",
        source_module="forecast_approval"
    )

    db.add(notification)
    db.commit()

    return approval