import os
import shutil
import pandas as pd

from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.models.dataset_version import DatasetVersion
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


UPLOAD_DIR = "app/uploads"


def upload_dataset(
    db: Session,
    file: UploadFile,
    current_user,
    project_id=None,
    organization_id=None
):
    if not organization_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="organization_id is required"
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV and Excel files are supported"
            )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid dataset file"
        )

    dataset = Dataset(
        name=file.filename,
        file_path=file_path,
        rows_count=len(df),
        columns_count=len(df.columns),
        current_version=1,
        user_id=current_user.id,
        project_id=project_id,
        organization_id=organization_id
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    version = DatasetVersion(
        dataset_id=dataset.id,
        version_number=1,
        file_path=file_path,
        change_summary="Initial dataset upload",
        uploaded_by=current_user.id
    )

    db.add(version)
    db.commit()

    if project_id:
        log_activity(
            db,
            project_id,
            current_user.id,
            "Dataset Uploaded",
            f"Dataset '{dataset.name}' was uploaded"
        )

    return dataset


def get_datasets(db: Session, current_user, organization_id=None):
    query = db.query(Dataset).filter(
        Dataset.user_id == current_user.id,
        Dataset.is_archived == False
    )

    if organization_id:
        query = query.filter(
            Dataset.organization_id == organization_id
        )

    return query.order_by(Dataset.id.desc()).all()


def archive_dataset(db: Session, dataset_id: int, current_user):
    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id,
        Dataset.user_id == current_user.id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    dataset.is_archived = True
    db.commit()

    if dataset.project_id:
        log_activity(
            db,
            dataset.project_id,
            current_user.id,
            "Dataset Archived",
            f"Dataset '{dataset.name}' was archived"
        )

    return success_response("Dataset archived successfully")


def upload_new_version(db: Session, dataset_id: int, file: UploadFile, current_user):
    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id,
        Dataset.user_id == current_user.id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    new_version = dataset.current_version + 1
    filename = f"v{new_version}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV and Excel files are supported"
            )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid dataset file"
        )

    dataset.current_version = new_version
    dataset.file_path = file_path
    dataset.rows_count = len(df)
    dataset.columns_count = len(df.columns)

    version = DatasetVersion(
        dataset_id=dataset.id,
        version_number=new_version,
        file_path=file_path,
        change_summary=f"Uploaded version {new_version}",
        uploaded_by=current_user.id
    )

    db.add(version)
    db.commit()
    db.refresh(dataset)

    if dataset.project_id:
        log_activity(
            db,
            dataset.project_id,
            current_user.id,
            "Dataset Version Uploaded",
            f"Dataset '{dataset.name}' updated to version {new_version}"
        )

    return dataset


def get_dataset_versions(db: Session, dataset_id: int, current_user):
    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id,
        Dataset.user_id == current_user.id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    return db.query(DatasetVersion).filter(
        DatasetVersion.dataset_id == dataset_id
    ).order_by(DatasetVersion.version_number.desc()).all()