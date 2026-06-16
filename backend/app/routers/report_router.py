from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.report_schema import ReportCreate, ReportResponse
from app.services.report_service import (
    create_report,
    get_reports,
    delete_report,
    generate_pdf_report,
    generate_excel_report,
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


@router.post("/", response_model=ReportResponse)
def generate_report(
    data: ReportCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_report(db, data, current_user)


@router.get("/", response_model=List[ReportResponse])
def list_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_reports(db, current_user)


@router.delete("/{report_id}")
def remove_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_report(db, report_id, current_user)


@router.get("/{report_id}/download/pdf")
def download_report_pdf(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        file_path = generate_pdf_report(
            db=db,
            report_id=report_id,
            current_user=current_user
        )

        return FileResponse(
            path=file_path,
            filename=f"forecast_report_{report_id}.pdf",
            media_type="application/pdf"
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"PDF report generation failed: {str(e)}"
        )


@router.get("/{report_id}/download/excel")
def download_report_excel(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        file_path = generate_excel_report(
            db=db,
            report_id=report_id,
            current_user=current_user
        )

        return FileResponse(
            path=file_path,
            filename=f"forecast_report_{report_id}.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Excel report generation failed: {str(e)}"
        )