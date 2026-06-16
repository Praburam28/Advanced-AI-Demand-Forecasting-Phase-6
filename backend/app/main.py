from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# =====================================================
# MODELS - Core
# =====================================================
from app.models.user import User

# =====================================================
# MODELS - Organization / Enterprise
# =====================================================
from app.models.organization import Organization
from app.models.organization_user import OrganizationUser
from app.models.organization_settings import OrganizationSettings
from app.models.announcement import Announcement

# =====================================================
# MODELS - Dataset / Forecast
# =====================================================
from app.models.dataset import Dataset
from app.models.dataset_version import DatasetVersion
from app.models.forecast_project import ForecastProject
from app.models.forecast_scenario import ForecastScenario
from app.models.forecast import Forecast
from app.models.forecast_comment import ForecastComment
from app.models.forecast_revision import ForecastRevision
from app.models.forecast_approval import ForecastApproval
from app.models.forecast_governance import ForecastGovernance

# =====================================================
# MODELS - Analytics / KPI / Planning
# =====================================================
from app.models.model_accuracy import ModelAccuracy
from app.models.dashboard_widget import DashboardWidget
from app.models.data_quality import DataQuality
from app.models.kpi import KPI
from app.models.kpi_trend import KPITrend
from app.models.planning import StrategicPlan

# =====================================================
# MODELS - Workflow / Notifications / Reports
# =====================================================
from app.models.workflow import Workflow
from app.models.workflow_log import WorkflowLog
from app.models.notification import Notification
from app.models.notification_preference import NotificationPreference
from app.models.report import Report
from app.models.executive_report import ExecutiveReport
from app.models.report_share import ReportShare
from app.models.report_schedule import ReportSchedule

# =====================================================
# MODELS - System / Integrations
# =====================================================
from app.models.audit_log import AuditLog
from app.models.integration import Integration
from app.models.alert import Alert
from app.models.automation import AutomationJob
from app.models.project_activity import ProjectActivity
from app.models.project_permission import ProjectPermission


# =====================================================
# ROUTERS - Core
# =====================================================
from app.routers.auth_router import router as auth_router
from app.routers.workspace_router import router as workspace_router
from app.routers.dashboard_router import router as dashboard_router

# =====================================================
# ROUTERS - Organization / Enterprise
# =====================================================
from app.routers import organization_router
from app.routers import organization_user_router
from app.routers import organization_settings_router
from app.routers import announcement_router

# =====================================================
# ROUTERS - Dataset / Forecast
# =====================================================
from app.routers.dataset_router import router as dataset_router
from app.routers.scenario_router import router as scenario_router
from app.routers.forecast_router import router as forecast_router
from app.routers import approval_router
from app.routers import governance_router
from app.routers import data_quality_router
from app.routers.dataset_compare_router import router as dataset_compare_router

# =====================================================
# ROUTERS - KPI / Planning
# =====================================================
from app.routers import kpi_router
from app.routers import kpi_trend_router
from app.routers import planning_router

# =====================================================
# ROUTERS - Workflow / Notifications
# =====================================================
from app.routers import workflow_router
from app.routers.notification_router import router as notification_router
from app.routers import notification_preference_router

# =====================================================
# ROUTERS - Reports / Collaboration
# =====================================================
from app.routers.report_router import router as report_router
from app.routers.report_share_router import router as report_share_router
from app.routers.report_schedule_router import router as report_schedule_router
from app.routers.collaboration_router import router as collaboration_router

# =====================================================
# ROUTERS - Analytics / Executive
# =====================================================
from app.routers.insights_router import router as insights_router
from app.routers.executive_router import router as executive_router
from app.routers.accuracy_router import router as accuracy_router
from app.routers import executive_command_router
from app.routers import executive_bi_router

# =====================================================
# ROUTERS - System
# =====================================================
from app.routers.activity_router import router as activity_router
from app.routers.permission_router import router as permission_router
from app.routers import audit_router


# =====================================================
# DATABASE TABLE CREATION
# =====================================================
Base.metadata.create_all(bind=engine)


# =====================================================
# FASTAPI APP
# =====================================================
app = FastAPI(
    title="Advanced AI Demand Forecasting SaaS - Phase 6 Enterprise",
    version="6.0.0",
    description="Enterprise AI Demand Forecasting SaaS with multi-organization management, approvals, governance, KPI analytics, workflow automation, and executive BI."
)


# =====================================================
# CORS
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# ROUTER REGISTRATION - Core
# =====================================================
app.include_router(auth_router)
app.include_router(workspace_router)
app.include_router(dashboard_router)

# =====================================================
# ROUTER REGISTRATION - Organization / Enterprise
# =====================================================
app.include_router(organization_router.router)
app.include_router(organization_user_router.router)
app.include_router(organization_settings_router.router)
app.include_router(announcement_router.router)

# =====================================================
# ROUTER REGISTRATION - Dataset / Forecast
# =====================================================
app.include_router(dataset_router)
app.include_router(scenario_router)
app.include_router(forecast_router)
app.include_router(approval_router.router)
app.include_router(governance_router.router)
app.include_router(data_quality_router.router)
app.include_router(dataset_compare_router)

# =====================================================
# ROUTER REGISTRATION - KPI / Planning
# =====================================================
app.include_router(kpi_router.router)
app.include_router(kpi_trend_router.router)
app.include_router(planning_router.router)

# =====================================================
# ROUTER REGISTRATION - Workflow / Notifications
# =====================================================
app.include_router(workflow_router.router)
app.include_router(notification_router)
app.include_router(notification_preference_router.router)

# =====================================================
# ROUTER REGISTRATION - Reports / Collaboration
# =====================================================
app.include_router(report_router)
app.include_router(report_share_router)
app.include_router(report_schedule_router)
app.include_router(collaboration_router)

# =====================================================
# ROUTER REGISTRATION - Analytics / Executive
# =====================================================
app.include_router(insights_router)
app.include_router(executive_router)
app.include_router(accuracy_router)
app.include_router(executive_command_router.router)
app.include_router(executive_bi_router.router)

# =====================================================
# ROUTER REGISTRATION - System
# =====================================================
app.include_router(activity_router)
app.include_router(permission_router)
app.include_router(audit_router.router)


# =====================================================
# ROOT ENDPOINT
# =====================================================
@app.get("/")
def root():
    return {
        "status": "success",
        "message": "Advanced AI Demand Forecasting SaaS Phase 6 Enterprise API running",
        "database": "demand_forecasting_phase6",
        "version": "6.0.0",
    }