from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.report import Report
from app.models.report_share import ReportShare
from app.models.user import User
from app.schemas.report_share_schema import ReportShareCreate
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


def share_report(db: Session, data: ReportShareCreate, current_user):
    report = db.query(Report).filter(
        Report.id == data.report_id,
        Report.created_by == current_user.id
    ).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found or you are not the owner"
        )

    user = db.query(User).filter(User.id == data.shared_with).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User to share with not found"
        )

    existing = db.query(ReportShare).filter(
        ReportShare.report_id == data.report_id,
        ReportShare.shared_with == data.shared_with,
        ReportShare.status == "active"
    ).first()

    if existing:
        existing.access_level = data.access_level
        db.commit()
        db.refresh(existing)
        return existing

    share = ReportShare(
        report_id=data.report_id,
        shared_by=current_user.id,
        shared_with=data.shared_with,
        access_level=data.access_level,
        status="active"
    )

    db.add(share)
    db.commit()
    db.refresh(share)

    if report.project_id:
        log_activity(
            db,
            report.project_id,
            current_user.id,
            "Report Shared",
            f"Report '{report.title}' shared with user #{data.shared_with}"
        )

    return share


def get_shared_reports(db: Session, current_user):
    return db.query(ReportShare).filter(
        ReportShare.shared_with == current_user.id,
        ReportShare.status == "active"
    ).all()


def get_report_shares(db: Session, report_id: int, current_user):
    report = db.query(Report).filter(
        Report.id == report_id,
        Report.created_by == current_user.id
    ).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )

    return db.query(ReportShare).filter(
        ReportShare.report_id == report_id,
        ReportShare.status == "active"
    ).all()


def revoke_report_share(db: Session, share_id: int, current_user):
    share = db.query(ReportShare).filter(
        ReportShare.id == share_id
    ).first()

    if not share:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Share record not found"
        )

    report = db.query(Report).filter(
        Report.id == share.report_id,
        Report.created_by == current_user.id
    ).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot revoke this share"
        )

    share.status = "revoked"
    db.commit()

    if report.project_id:
        log_activity(
            db,
            report.project_id,
            current_user.id,
            "Report Share Revoked",
            f"Share access removed for report '{report.title}'"
        )

    return success_response("Report share revoked successfully")