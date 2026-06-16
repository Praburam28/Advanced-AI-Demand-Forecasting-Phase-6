from sqlalchemy.orm import Session

from app.models.forecast import Forecast
from app.models.kpi import KPI
from app.models.planning import StrategicPlan
from app.models.data_quality import DataQuality
from app.models.forecast_approval import ForecastApproval


def get_executive_bi_summary(db: Session, organization_id: int):
    forecasts = db.query(Forecast).filter(
        Forecast.organization_id == organization_id
    ).all()

    kpis = db.query(KPI).filter(
        KPI.organization_id == organization_id
    ).all()

    plans = db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id
    ).all()

    data_quality = db.query(DataQuality).filter(
        DataQuality.organization_id == organization_id
    ).all()

    approvals = db.query(ForecastApproval).filter(
        ForecastApproval.organization_id == organization_id
    ).all()

    total_predicted_demand = sum(f.predicted_demand or 0 for f in forecasts)
    total_revenue_forecast = sum(f.revenue_forecast or 0 for f in forecasts)
    total_profit_forecast = sum(f.profit_forecast or 0 for f in forecasts)
    total_cost_forecast = sum(f.cost_forecast or 0 for f in forecasts)

    avg_mape = (
        round(sum(f.mape or 0 for f in forecasts) / len(forecasts), 2)
        if forecasts else 0
    )

    avg_quality_score = (
        round(sum(d.quality_score or 0 for d in data_quality) / len(data_quality), 2)
        if data_quality else 0
    )

    avg_plan_achievement = (
        round(sum(p.achievement_percentage or 0 for p in plans) / len(plans), 2)
        if plans else 0
    )

    return {
        "summary_cards": {
            "total_forecasts": len(forecasts),
            "total_kpis": len(kpis),
            "total_plans": len(plans),
            "total_approvals": len(approvals),
            "total_predicted_demand": total_predicted_demand,
            "total_revenue_forecast": total_revenue_forecast,
            "total_profit_forecast": total_profit_forecast,
            "total_cost_forecast": total_cost_forecast,
            "average_mape": avg_mape,
            "average_quality_score": avg_quality_score,
            "average_plan_achievement": avg_plan_achievement,
        },
        "forecast_financial_chart": [
            {
                "name": "Revenue",
                "value": total_revenue_forecast
            },
            {
                "name": "Profit",
                "value": total_profit_forecast
            },
            {
                "name": "Cost",
                "value": total_cost_forecast
            },
        ],
        "approval_status_chart": [
            {
                "name": "Pending",
                "value": len([a for a in approvals if a.status == "pending"])
            },
            {
                "name": "Approved",
                "value": len([a for a in approvals if a.status == "approved"])
            },
            {
                "name": "Rejected",
                "value": len([a for a in approvals if a.status == "rejected"])
            },
            {
                "name": "Revision",
                "value": len([a for a in approvals if a.status == "revision_required"])
            },
        ],
        "kpi_status_chart": [
            {
                "name": "On Track",
                "value": len([k for k in kpis if k.status == "on_track"])
            },
            {
                "name": "Warning",
                "value": len([k for k in kpis if k.status == "warning"])
            },
            {
                "name": "Critical",
                "value": len([k for k in kpis if k.status == "critical"])
            },
        ],
        "planning_status_chart": [
            {
                "name": "On Track",
                "value": len([p for p in plans if p.status == "on_track"])
            },
            {
                "name": "At Risk",
                "value": len([p for p in plans if p.status == "at_risk"])
            },
            {
                "name": "Behind Target",
                "value": len([p for p in plans if p.status == "behind_target"])
            },
        ],
        "data_quality_chart": [
            {
                "name": "Good",
                "value": len([d for d in data_quality if d.status == "good"])
            },
            {
                "name": "Warning",
                "value": len([d for d in data_quality if d.status == "warning"])
            },
            {
                "name": "Poor",
                "value": len([d for d in data_quality if d.status == "poor"])
            },
        ],
    }