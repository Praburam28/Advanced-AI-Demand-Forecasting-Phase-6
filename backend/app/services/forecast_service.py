from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.models.model_accuracy import ModelAccuracy
from app.models.forecast_revision import ForecastRevision
from app.schemas.forecast_schema import ForecastCreate
from app.services.activity_service import log_activity
from app.services.ml_forecast_service import train_forecast_model
from app.utils.response_handler import success_response


def clean_optional_id(value):
    if value is None:
        return None

    try:
        value = int(value)
    except Exception:
        return None

    return value if value > 0 else None


def generate_forecast(db: Session, data: ForecastCreate, current_user):
    dataset = db.query(Dataset).filter(
        Dataset.id == data.dataset_id,
        Dataset.user_id == current_user.id,
        Dataset.is_archived == False
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    project_id = clean_optional_id(data.project_id)
    scenario_id = clean_optional_id(data.scenario_id)

    try:
        result = train_forecast_model(
            dataset.file_path,
            data.model_name
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Forecast training failed: {str(e)}"
        )

    ai_summary = (
        f"{data.model_name} predicts total demand of "
        f"{result['predicted_demand']} units for the next forecast cycle."
    )

    recommendation = (
        "Use this forecast to optimize inventory planning, revenue targets, "
        "and procurement decisions. Review MAPE and R2 score before executive reporting."
    )

    forecast = Forecast(
        model_name=data.model_name,
        forecast_period=data.forecast_period,
        predicted_demand=result["predicted_demand"],
        revenue_forecast=result["revenue_forecast"],
        profit_forecast=result["profit_forecast"],
        cost_forecast=result["cost_forecast"],
        mae=result["mae"],
        mse=result["mse"],
        rmse=result["rmse"],
        mape=result["mape"],
        r2_score=result["r2_score"],
        ai_summary=ai_summary,
        recommendation=recommendation,
        dataset_id=data.dataset_id,
        project_id=project_id,
        scenario_id=scenario_id,
        user_id=current_user.id,
        organization_id=dataset.organization_id,
        approval_status="draft"
    )

    db.add(forecast)
    db.commit()
    db.refresh(forecast)

    accuracy = ModelAccuracy(
        model_name=data.model_name,
        mae=result["mae"],
        mse=result["mse"],
        rmse=result["rmse"],
        mape=result["mape"],
        r2_score=result["r2_score"],
        accuracy_score=result["accuracy_score"],
        forecast_id=forecast.id,
        project_id=project_id
    )

    revision = ForecastRevision(
        forecast_id=forecast.id,
        version_number=1,
        changes="Initial ML forecast generated",
        updated_by=current_user.id
    )

    db.add(accuracy)
    db.add(revision)
    db.commit()

    if project_id:
        log_activity(
            db,
            project_id,
            current_user.id,
            "ML Forecast Generated",
            f"Forecast generated using {data.model_name}"
        )

    return forecast


def get_forecasts(db: Session, current_user, organization_id=None):
    query = db.query(Forecast).filter(
        Forecast.user_id == current_user.id
    )

    if organization_id:
        query = query.filter(
            Forecast.organization_id == organization_id
        )

    return query.order_by(Forecast.created_at.desc()).all()


def get_forecast_by_id(db: Session, forecast_id: int, current_user):
    forecast = db.query(Forecast).filter(
        Forecast.id == forecast_id,
        Forecast.user_id == current_user.id
    ).first()

    if not forecast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forecast not found"
        )

    return forecast


def delete_forecast(db: Session, forecast_id: int, current_user):
    forecast = get_forecast_by_id(db, forecast_id, current_user)

    project_id = forecast.project_id
    model_name = forecast.model_name

    db.delete(forecast)
    db.commit()

    if project_id:
        log_activity(
            db,
            project_id,
            current_user.id,
            "Forecast Deleted",
            f"Forecast generated using {model_name} was deleted"
        )

    return success_response("Forecast deleted successfully")