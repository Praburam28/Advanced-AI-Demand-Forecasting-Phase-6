from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DashboardWidgetCreate(BaseModel):
    widget_name: str
    widget_type: str
    layout_config: Optional[str] = None
    filters_config: Optional[str] = None


class DashboardWidgetResponse(BaseModel):
    id: int
    widget_name: str
    widget_type: str
    layout_config: Optional[str]
    filters_config: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class DashboardFilterRequest(BaseModel):
    project_id: Optional[int] = None
    region: Optional[str] = None
    category: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None