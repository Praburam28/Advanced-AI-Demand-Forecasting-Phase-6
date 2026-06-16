from sqlalchemy.orm import Session
from app.models.kpi import KPI
from app.models.planning import StrategicPlan
from app.models.data_quality import DataQuality
from app.models.forecast_approval import ForecastApproval
from app.models.workflow import Workflow
from app.models.workflow_log import WorkflowLog


def get_executive_command_summary(db: Session, organization_id: int):
    kpis = db.query(KPI).filter(KPI.organization_id == organization_id).all()
    plans = db.query(StrategicPlan).filter(StrategicPlan.organization_id == organization_id).all()
    quality = db.query(DataQuality).filter(DataQuality.organization_id == organization_id).all()
    approvals = db.query(ForecastApproval).filter(ForecastApproval.organization_id == organization_id).all()
    workflows = db.query(Workflow).filter(Workflow.organization_id == organization_id).all()
    workflow_logs = db.query(WorkflowLog).filter(WorkflowLog.organization_id == organization_id).all()

    avg_quality = 0
    if quality:
        avg_quality = round(sum(q.quality_score for q in quality) / len(quality), 2)

    avg_plan_achievement = 0
    if plans:
        avg_plan_achievement = round(
            sum(p.achievement_percentage for p in plans) / len(plans),
            2
        )

    critical_kpis = [k for k in kpis if k.status == "critical"]
    pending_approvals = [a for a in approvals if a.status == "pending"]
    failed_workflows = [w for w in workflow_logs if w.status == "failed"]
    poor_quality = [q for q in quality if q.status == "poor"]

    alerts = []

    if critical_kpis:
        alerts.append(f"{len(critical_kpis)} KPI(s) are critical")

    if pending_approvals:
        alerts.append(f"{len(pending_approvals)} forecast approval(s) pending")

    if failed_workflows:
        alerts.append(f"{len(failed_workflows)} workflow execution(s) failed")

    if poor_quality:
        alerts.append(f"{len(poor_quality)} dataset(s) have poor quality")

    return {
        "organization_id": organization_id,
        "kpi_summary": {
            "total_kpis": len(kpis),
            "on_track": len([k for k in kpis if k.status == "on_track"]),
            "warning": len([k for k in kpis if k.status == "warning"]),
            "critical": len(critical_kpis),
        },
        "planning_summary": {
            "total_plans": len(plans),
            "average_achievement": avg_plan_achievement,
            "on_track": len([p for p in plans if p.status == "on_track"]),
            "at_risk": len([p for p in plans if p.status == "at_risk"]),
            "behind_target": len([p for p in plans if p.status == "behind_target"]),
        },
        "data_quality_summary": {
            "datasets_checked": len(quality),
            "average_quality_score": avg_quality,
            "good": len([q for q in quality if q.status == "good"]),
            "warning": len([q for q in quality if q.status == "warning"]),
            "poor": len(poor_quality),
        },
        "approval_summary": {
            "total_approvals": len(approvals),
            "pending": len(pending_approvals),
            "approved": len([a for a in approvals if a.status == "approved"]),
            "rejected": len([a for a in approvals if a.status == "rejected"]),
            "revision_required": len([a for a in approvals if a.status == "revision_required"]),
        },
        "workflow_summary": {
            "total_workflows": len(workflows),
            "active_workflows": len([w for w in workflows if w.is_active]),
            "total_executions": len(workflow_logs),
            "failed_executions": len(failed_workflows),
        },
        "executive_alerts": alerts
    }