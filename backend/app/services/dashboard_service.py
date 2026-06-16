import json
import pandas as pd

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.dashboard_widget import DashboardWidget
from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.schemas.dashboard_schema import DashboardWidgetCreate, DashboardFilterRequest
from app.utils.response_handler import success_response


def create_widget(db: Session, data: DashboardWidgetCreate, current_user):
    widget = DashboardWidget(
        widget_name=data.widget_name,
        widget_type=data.widget_type,
        layout_config=data.layout_config,
        filters_config=data.filters_config,
        user_id=current_user.id
    )

    db.add(widget)
    db.commit()
    db.refresh(widget)

    return widget


def get_widgets(db: Session, current_user):
    return db.query(DashboardWidget).filter(
        DashboardWidget.user_id == current_user.id
    ).all()


def delete_widget(db: Session, widget_id: int, current_user):
    widget = db.query(DashboardWidget).filter(
        DashboardWidget.id == widget_id,
        DashboardWidget.user_id == current_user.id
    ).first()

    if not widget:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Widget not found"
        )

    db.delete(widget)
    db.commit()

    return success_response("Widget deleted successfully")


def read_dataset(file_path: str):
    if file_path.endswith(".csv"):
        return pd.read_csv(file_path)

    if file_path.endswith(".xlsx"):
        return pd.read_excel(file_path)

    return pd.DataFrame()


def get_filtered_dashboard_analytics(
    db: Session,
    filters: DashboardFilterRequest,
    current_user
):
    datasets_query = db.query(Dataset).filter(
        Dataset.user_id == current_user.id,
        Dataset.is_archived == False
    )

    forecasts_query = db.query(Forecast).filter(
        Forecast.user_id == current_user.id
    )

    if filters.project_id:
        datasets_query = datasets_query.filter(
            Dataset.project_id == filters.project_id
        )

        forecasts_query = forecasts_query.filter(
            Forecast.project_id == filters.project_id
        )

    datasets = datasets_query.all()
    forecasts = forecasts_query.all()

    combined_df = pd.DataFrame()

    for dataset in datasets:
        df = read_dataset(dataset.file_path)

        if df.empty:
            continue

        if filters.region and "region" in df.columns:
            df = df[df["region"] == filters.region]

        if filters.category and "category" in df.columns:
            df = df[df["category"] == filters.category]

        if filters.start_date and "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"])
            df = df[df["date"] >= pd.to_datetime(filters.start_date)]

        if filters.end_date and "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"])
            df = df[df["date"] <= pd.to_datetime(filters.end_date)]

        combined_df = pd.concat([combined_df, df], ignore_index=True)

    total_revenue = 0
    total_profit = 0
    total_units = 0
    total_cost = 0

    if not combined_df.empty:
        if "revenue" in combined_df.columns:
            total_revenue = round(float(combined_df["revenue"].sum()), 2)

        if "profit" in combined_df.columns:
            total_profit = round(float(combined_df["profit"].sum()), 2)

        if "units_sold" in combined_df.columns:
            total_units = round(float(combined_df["units_sold"].sum()), 2)

        if "cost" in combined_df.columns:
            total_cost = round(float(combined_df["cost"].sum()), 2)

    forecast_revenue = round(
        float(sum(item.revenue_forecast for item in forecasts)),
        2
    )

    forecast_profit = round(
        float(sum(item.profit_forecast for item in forecasts)),
        2
    )

    forecast_demand = round(
        float(sum(item.predicted_demand for item in forecasts)),
        2
    )

    category_breakdown = []

    if not combined_df.empty and "category" in combined_df.columns:
        category_breakdown = (
            combined_df.groupby("category")
            .agg(
                revenue=("revenue", "sum") if "revenue" in combined_df.columns else ("category", "count"),
                units=("units_sold", "sum") if "units_sold" in combined_df.columns else ("category", "count")
            )
            .reset_index()
            .to_dict(orient="records")
        )

    region_breakdown = []

    if not combined_df.empty and "region" in combined_df.columns:
        region_breakdown = (
            combined_df.groupby("region")
            .agg(
                revenue=("revenue", "sum") if "revenue" in combined_df.columns else ("region", "count"),
                units=("units_sold", "sum") if "units_sold" in combined_df.columns else ("region", "count")
            )
            .reset_index()
            .to_dict(orient="records")
        )

    monthly_trend = []

    if not combined_df.empty and "date" in combined_df.columns:
        combined_df["date"] = pd.to_datetime(combined_df["date"])
        combined_df["month"] = combined_df["date"].dt.to_period("M").astype(str)

        monthly_trend = (
            combined_df.groupby("month")
            .agg(
                revenue=("revenue", "sum") if "revenue" in combined_df.columns else ("month", "count"),
                units=("units_sold", "sum") if "units_sold" in combined_df.columns else ("month", "count")
            )
            .reset_index()
            .to_dict(orient="records")
        )

    return success_response(
        "Dashboard analytics generated successfully",
        {
            "actuals": {
                "total_revenue": total_revenue,
                "total_profit": total_profit,
                "total_units": total_units,
                "total_cost": total_cost,
                "dataset_count": len(datasets)
            },
            "forecasts": {
                "forecast_revenue": forecast_revenue,
                "forecast_profit": forecast_profit,
                "forecast_demand": forecast_demand,
                "forecast_count": len(forecasts)
            },
            "breakdowns": {
                "category_breakdown": category_breakdown,
                "region_breakdown": region_breakdown,
                "monthly_trend": monthly_trend
            },
            "applied_filters": filters.dict()
        }
    )