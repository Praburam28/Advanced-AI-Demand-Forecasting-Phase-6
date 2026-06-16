from typing import List, Optional

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.dataset_schema import DatasetResponse
from app.services.dataset_service import (
    upload_dataset,
    get_datasets,
    archive_dataset,
    upload_new_version,
    get_dataset_versions
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/datasets",
    tags=["Datasets"]
)


@router.post("/upload", response_model=DatasetResponse)
def upload_new_dataset(
    file: UploadFile = File(...),
    organization_id: int = Form(...),
    project_id: Optional[int] = Form(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return upload_dataset(
        db=db,
        file=file,
        current_user=current_user,
        project_id=project_id,
        organization_id=organization_id
    )


@router.get("/", response_model=List[DatasetResponse])
def list_datasets(
    organization_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_datasets(
        db=db,
        current_user=current_user,
        organization_id=organization_id
    )


@router.put("/{dataset_id}/archive")
def archive_existing_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return archive_dataset(db, dataset_id, current_user)


@router.post("/{dataset_id}/versions", response_model=DatasetResponse)
def upload_dataset_version(
    dataset_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return upload_new_version(db, dataset_id, file, current_user)


@router.get("/{dataset_id}/versions")
def list_dataset_versions(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_dataset_versions(db, dataset_id, current_user)