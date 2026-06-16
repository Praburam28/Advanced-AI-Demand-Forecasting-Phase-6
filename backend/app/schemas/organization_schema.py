from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrganizationCreate(BaseModel):
    name: str
    industry: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    industry: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None

class OrganizationResponse(BaseModel):
    id: int
    name: str
    industry: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True