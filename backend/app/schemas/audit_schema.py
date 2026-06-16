from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditLogResponse(BaseModel):
    id: int
    organization_id: Optional[int]
    user_id: Optional[int]
    module: str
    action: str
    description: Optional[str]
    entity_type: Optional[str]
    entity_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True