import pandas as pd
from sqlalchemy.orm import Session

from app.models.data_quality import DataQuality
from app.schemas.data_quality_schema import DataQualityCreate
from app.services.audit_service import create_audit_log


def calculate_quality_score(total_rows, total_columns, missing_values, duplicate_rows):
    if total_rows == 0 or total_columns == 0:
        return 0

    total_cells = total_rows * total_columns
    missing_penalty = (missing_values / total_cells) * 50
    duplicate_penalty = (duplicate_rows / total_rows) * 50

    score = 100 - missing_penalty - duplicate_penalty
    return max(round(score, 2), 0)


def get_quality_status(score):
    if score >= 85:
        return "good"
    elif score >= 60:
        return "warning"
    return "poor"


def generate_data_quality_from_file(
    db: Session,
    organization_id: int,
    dataset_id: int,
    file_path: str,
    user_id: int = None
):
    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)
    elif file_path.endswith(".xlsx"):
        df = pd.read_excel(file_path)
    else:
        raise ValueError("Only CSV and Excel files are supported")

    total_rows = len(df)
    total_columns = len(df.columns)
    missing_values = int(df.isnull().sum().sum())
    duplicate_rows = int(df.duplicated().sum())

    quality_score = calculate_quality_score(
        total_rows,
        total_columns,
        missing_values,
        duplicate_rows
    )

    status = get_quality_status(quality_score)

    validation_summary = (
        f"Dataset contains {total_rows} rows and {total_columns} columns. "
        f"Missing values: {missing_values}. "
        f"Duplicate rows: {duplicate_rows}. "
        f"Quality score: {quality_score}%."
    )

    record = DataQuality(
        organization_id=organization_id,
        dataset_id=dataset_id,
        quality_score=quality_score,
        missing_values=missing_values,
        duplicate_rows=duplicate_rows,
        total_rows=total_rows,
        total_columns=total_columns,
        status=status,
        validation_summary=validation_summary
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    create_audit_log(
        db=db,
        module="Data Quality",
        action="GENERATED",
        description=validation_summary,
        organization_id=organization_id,
        user_id=user_id,
        entity_type="data_quality",
        entity_id=record.id
    )

    return record


def create_data_quality_record(db: Session, data: DataQualityCreate):
    record = DataQuality(**data.dict())

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


def get_data_quality_records(db: Session, organization_id: int):
    return db.query(DataQuality).filter(
        DataQuality.organization_id == organization_id
    ).order_by(DataQuality.id.desc()).all()


def get_dataset_quality(db: Session, dataset_id: int):
    return db.query(DataQuality).filter(
        DataQuality.dataset_id == dataset_id
    ).order_by(DataQuality.id.desc()).first()


def get_data_quality_summary(db: Session, organization_id: int):
    records = db.query(DataQuality).filter(
        DataQuality.organization_id == organization_id
    ).all()

    if not records:
        return {
            "average_score": 0,
            "total_datasets_checked": 0,
            "good": 0,
            "warning": 0,
            "poor": 0
        }

    avg_score = round(
        sum(record.quality_score for record in records) / len(records),
        2
    )

    return {
        "average_score": avg_score,
        "total_datasets_checked": len(records),
        "good": len([r for r in records if r.status == "good"]),
        "warning": len([r for r in records if r.status == "warning"]),
        "poor": len([r for r in records if r.status == "poor"]),
    }