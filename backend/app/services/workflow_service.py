from sqlalchemy.orm import Session

from app.models.workflow import Workflow
from app.models.workflow_log import WorkflowLog
from app.models.forecast import Forecast
from app.models.report import Report
from app.models.notification import Notification

from app.schemas.workflow_schema import WorkflowCreate, WorkflowUpdate

from app.services.audit_service import create_audit_log


def create_workflow(db: Session, data: WorkflowCreate):
    workflow = Workflow(**data.dict())

    db.add(workflow)
    db.commit()
    db.refresh(workflow)

    create_audit_log(
        db=db,
        module="Workflow Automation",
        action="CREATED",
        description=f"Workflow '{workflow.name}' created",
        organization_id=workflow.organization_id,
        user_id=workflow.created_by,
        entity_type="workflow",
        entity_id=workflow.id
    )

    return workflow


def get_workflows(db: Session, organization_id: int):
    return db.query(Workflow).filter(
        Workflow.organization_id == organization_id
    ).order_by(Workflow.id.desc()).all()


def get_workflow(db: Session, workflow_id: int):
    return db.query(Workflow).filter(
        Workflow.id == workflow_id
    ).first()


def update_workflow(db: Session, workflow_id: int, data: WorkflowUpdate):
    workflow = get_workflow(db, workflow_id)

    if not workflow:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(workflow, key, value)

    db.commit()
    db.refresh(workflow)

    create_audit_log(
        db=db,
        module="Workflow Automation",
        action="UPDATED",
        description=f"Workflow '{workflow.name}' updated",
        organization_id=workflow.organization_id,
        user_id=workflow.created_by,
        entity_type="workflow",
        entity_id=workflow.id
    )

    return workflow


def delete_workflow(db: Session, workflow_id: int):
    workflow = get_workflow(db, workflow_id)

    if not workflow:
        return None

    db.delete(workflow)
    db.commit()

    return workflow


def execute_workflow(db: Session, workflow_id: int):
    workflow = get_workflow(db, workflow_id)

    if not workflow:
        return None

    if not workflow.is_active:
        log = WorkflowLog(
            workflow_id=workflow.id,
            organization_id=workflow.organization_id,
            status="failed",
            message="Workflow is inactive"
        )

        db.add(log)
        db.commit()
        db.refresh(log)

        return log

    message = ""

    try:
        if workflow.action_type == "generate_forecast":
            forecast = Forecast(
                organization_id=workflow.organization_id,
                model_name="Auto Workflow Forecast",
                forecast_period=30,
                predicted_demand=0,
                revenue_forecast=0,
                profit_forecast=0,
                cost_forecast=0,
                mae=0,
                mse=0,
                rmse=0,
                mape=0,
                r2_score=0,
                ai_summary="Forecast generated automatically by workflow.",
                recommendation="Review forecast output and submit for approval.",
                user_id=workflow.created_by,
                approval_status="draft"
            )

            db.add(forecast)
            db.commit()
            db.refresh(forecast)

            message = f"Forecast generated successfully. Forecast ID: {forecast.id}"

        elif workflow.action_type == "generate_report":
            report = Report(
                organization_id=workflow.organization_id,
                title=f"Auto Report - {workflow.name}",
                report_type="workflow",
                status="generated",
                created_by=workflow.created_by,
                report_category="workflow"
            )

            db.add(report)
            db.commit()
            db.refresh(report)

            message = f"Report generated successfully. Report ID: {report.id}"

        elif workflow.action_type == "send_notification":
            notification = Notification(
                organization_id=workflow.organization_id,
                title=f"Workflow Notification - {workflow.name}",
                message="Automated notification triggered by workflow.",
                notification_type="workflow",
                is_read=False,
                user_id=None,
                role="all",
                is_announcement=False,
                announcement_priority="normal",
                source_module="workflow"
            )

            db.add(notification)
            db.commit()
            db.refresh(notification)

            message = f"Notification sent successfully. Notification ID: {notification.id}"

        elif workflow.action_type == "request_approval":
            notification = Notification(
                organization_id=workflow.organization_id,
                title=f"Approval Required - {workflow.name}",
                message="A workflow has requested forecast approval.",
                notification_type="approval",
                is_read=False,
                user_id=None,
                role="manager",
                is_announcement=False,
                announcement_priority="high",
                source_module="workflow"
            )

            db.add(notification)
            db.commit()
            db.refresh(notification)

            message = "Approval request notification created successfully."

        else:
            message = f"No real execution mapped for action: {workflow.action_type}"

        log = WorkflowLog(
            workflow_id=workflow.id,
            organization_id=workflow.organization_id,
            status="success",
            message=message
        )

        db.add(log)
        db.commit()
        db.refresh(log)

        create_audit_log(
            db=db,
            module="Workflow Automation",
            action="EXECUTED",
            description=message,
            organization_id=workflow.organization_id,
            user_id=workflow.created_by,
            entity_type="workflow",
            entity_id=workflow.id
        )

        return log

    except Exception as e:
        log = WorkflowLog(
            workflow_id=workflow.id,
            organization_id=workflow.organization_id,
            status="failed",
            message=str(e)
        )

        db.add(log)
        db.commit()
        db.refresh(log)

        return log


def get_workflow_logs(db: Session, organization_id: int):
    return db.query(WorkflowLog).filter(
        WorkflowLog.organization_id == organization_id
    ).order_by(WorkflowLog.id.desc()).all()


def get_workflow_summary(db: Session, organization_id: int):
    workflows = db.query(Workflow).filter(
        Workflow.organization_id == organization_id
    ).all()

    logs = db.query(WorkflowLog).filter(
        WorkflowLog.organization_id == organization_id
    ).all()

    return {
        "total_workflows": len(workflows),
        "active_workflows": len([w for w in workflows if w.is_active]),
        "inactive_workflows": len([w for w in workflows if not w.is_active]),
        "total_executions": len(logs),
        "successful_executions": len([l for l in logs if l.status == "success"]),
        "failed_executions": len([l for l in logs if l.status == "failed"]),
    }