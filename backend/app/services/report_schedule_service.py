from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.report_schedule import ReportSchedule
from app.models.forecast_project import ForecastProject
from app.schemas.report_schedule_schema import ReportScheduleCreate
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


VALID_FREQUENCIES = ["daily", "weekly", "monthly"]
VALID_FORMATS = ["pdf", "excel"]


def create_report_schedule(db: Session, data: ReportScheduleCreate, current_user):
    if data.schedule_frequency not in VALID_FREQUENCIES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid schedule frequency"
        )

    if data.delivery_format not in VALID_FORMATS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid delivery format"
        )

    if data.project_id:
        project = db.query(ForecastProject).filter(
            ForecastProject.id == data.project_id,
            ForecastProject.status != "deleted"
        ).first()

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

    schedule = ReportSchedule(
        report_type=data.report_type,
        schedule_frequency=data.schedule_frequency,
        delivery_format=data.delivery_format,
        recipient_email=data.recipient_email,
        project_id=data.project_id,
        created_by=current_user.id,
        is_active=True
    )

    db.add(schedule)
    db.commit()
    db.refresh(schedule)

    if data.project_id:
        log_activity(
            db,
            data.project_id,
            current_user.id,
            "Report Schedule Created",
            f"{data.schedule_frequency.title()} {data.report_type} report schedule created"
        )

    return schedule


def get_report_schedules(db: Session, current_user):
    return db.query(ReportSchedule).filter(
        ReportSchedule.created_by == current_user.id
    ).order_by(ReportSchedule.created_at.desc()).all()


def toggle_report_schedule(db: Session, schedule_id: int, current_user):
    schedule = db.query(ReportSchedule).filter(
        ReportSchedule.id == schedule_id,
        ReportSchedule.created_by == current_user.id
    ).first()

    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report schedule not found"
        )

    schedule.is_active = not schedule.is_active
    db.commit()
    db.refresh(schedule)

    if schedule.project_id:
        status_text = "activated" if schedule.is_active else "deactivated"

        log_activity(
            db,
            schedule.project_id,
            current_user.id,
            "Report Schedule Updated",
            f"Report schedule was {status_text}"
        )

    return schedule


def delete_report_schedule(db: Session, schedule_id: int, current_user):
    schedule = db.query(ReportSchedule).filter(
        ReportSchedule.id == schedule_id,
        ReportSchedule.created_by == current_user.id
    ).first()

    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report schedule not found"
        )

    project_id = schedule.project_id

    db.delete(schedule)
    db.commit()

    if project_id:
        log_activity(
            db,
            project_id,
            current_user.id,
            "Report Schedule Deleted",
            "Report schedule configuration was deleted"
        )

    return success_response("Report schedule deleted successfully")