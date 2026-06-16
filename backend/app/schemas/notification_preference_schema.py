from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationPreferenceCreate(BaseModel):
    organization_id: int
    user_id: int
    role: str = "analyst"
    forecast_alerts: bool = True
    approval_alerts: bool = True
    report_alerts: bool = True
    workflow_alerts: bool = True
    kpi_alerts: bool = True
    data_quality_alerts: bool = True
    email_enabled: bool = False
    in_app_enabled: bool = True

class NotificationPreferenceUpdate(BaseModel):
    role: Optional[str] = None
    forecast_alerts: Optional[bool] = None
    approval_alerts: Optional[bool] = None
    report_alerts: Optional[bool] = None
    workflow_alerts: Optional[bool] = None
    kpi_alerts: Optional[bool] = None
    data_quality_alerts: Optional[bool] = None
    email_enabled: Optional[bool] = None
    in_app_enabled: Optional[bool] = None

class NotificationPreferenceResponse(BaseModel):
    id: int
    organization_id: int
    user_id: int
    role: str
    forecast_alerts: bool
    approval_alerts: bool
    report_alerts: bool
    workflow_alerts: bool
    kpi_alerts: bool
    data_quality_alerts: bool
    email_enabled: bool
    in_app_enabled: bool
    created_at: datetime

    class Config:
        from_attributes = True