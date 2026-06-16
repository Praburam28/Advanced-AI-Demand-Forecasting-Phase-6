from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class WorkflowCreate(BaseModel):
    organization_id: int
    name: str
    description: Optional[str] = None
    workflow_type: str
    trigger_event: str
    action_type: str
    configuration: Optional[str] = None
    created_by: Optional[int] = None


class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    workflow_type: Optional[str] = None
    trigger_event: Optional[str] = None
    action_type: Optional[str] = None
    configuration: Optional[str] = None
    is_active: Optional[bool] = None


class WorkflowResponse(BaseModel):
    id: int
    organization_id: int
    name: str
    description: Optional[str]
    workflow_type: str
    trigger_event: str
    action_type: str
    configuration: Optional[str]
    is_active: bool
    created_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True