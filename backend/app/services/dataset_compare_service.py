import pandas as pd

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.models.dataset_version import DatasetVersion
from app.schemas.dataset_compare_schema import DatasetCompareRequest
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


def read_dataset_file(file_path: str):
    if file_path.endswith(".csv"):
        return pd.read_csv(file_path)

    if file_path.endswith(".xlsx"):
        return pd.read_excel(file_path)

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Unsupported dataset file type"
    )


def compare_dataset_versions(
    db: Session,
    data: DatasetCompareRequest,
    current_user
):
    dataset = db.query(Dataset).filter(
        Dataset.id == data.dataset_id,
        Dataset.user_id == current_user.id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    version_1 = db.query(DatasetVersion).filter(
        DatasetVersion.dataset_id == data.dataset_id,
        DatasetVersion.version_number == data.version_1
    ).first()

    version_2 = db.query(DatasetVersion).filter(
        DatasetVersion.dataset_id == data.dataset_id,
        DatasetVersion.version_number == data.version_2
    ).first()

    if not version_1 or not version_2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="One or both dataset versions not found"
        )

    df1 = read_dataset_file(version_1.file_path)
    df2 = read_dataset_file(version_2.file_path)

    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    added_columns = list(cols2 - cols1)
    removed_columns = list(cols1 - cols2)
    common_columns = list(cols1.intersection(cols2))

    numeric_changes = []

    for col in common_columns:
        if pd.api.types.is_numeric_dtype(df1[col]) and pd.api.types.is_numeric_dtype(df2[col]):
            numeric_changes.append({
                "column": col,
                "version_1_sum": round(float(df1[col].sum()), 2),
                "version_2_sum": round(float(df2[col].sum()), 2),
                "difference": round(float(df2[col].sum() - df1[col].sum()), 2),
                "version_1_mean": round(float(df1[col].mean()), 2),
                "version_2_mean": round(float(df2[col].mean()), 2),
            })

    result = {
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "version_1": data.version_1,
        "version_2": data.version_2,
        "rows_version_1": len(df1),
        "rows_version_2": len(df2),
        "row_difference": len(df2) - len(df1),
        "columns_version_1": len(df1.columns),
        "columns_version_2": len(df2.columns),
        "column_difference": len(df2.columns) - len(df1.columns),
        "added_columns": added_columns,
        "removed_columns": removed_columns,
        "common_columns": common_columns,
        "numeric_changes": numeric_changes
    }

    if dataset.project_id:
        log_activity(
            db,
            dataset.project_id,
            current_user.id,
            "Dataset Compared",
            f"Compared dataset '{dataset.name}' version {data.version_1} and version {data.version_2}"
        )

    return success_response(
        "Dataset versions compared successfully",
        result
    )