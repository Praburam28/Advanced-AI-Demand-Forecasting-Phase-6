from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OrganizationSettingsCreate(BaseModel):
    organization_id: int
    timezone: str = "Asia/Kolkata"
    currency: str = "INR"
    date_format: str = "DD-MM-YYYY"
    forecast_frequency: str = "monthly"
    approval_required: bool = True
    email_notifications: bool = False
    in_app_notifications: bool = True
    data_retention_days: int = 365


class OrganizationSettingsUpdate(BaseModel):
    timezone: Optional[str] = None
    currency: Optional[str] = None
    date_format: Optional[str] = None
    forecast_frequency: Optional[str] = None
    approval_required: Optional[bool] = None
    email_notifications: Optional[bool] = None
    in_app_notifications: Optional[bool] = None
    data_retention_days: Optional[int] = None


class OrganizationSettingsResponse(BaseModel):
    id: int
    organization_id: int
    timezone: str
    currency: str
    date_format: str
    forecast_frequency: str
    approval_required: bool
    email_notifications: bool
    in_app_notifications: bool
    data_retention_days: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True