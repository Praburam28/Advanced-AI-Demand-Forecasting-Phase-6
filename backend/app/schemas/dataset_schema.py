from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DatasetResponse(BaseModel):
    id: int
    name: str
    file_path: str
    rows_count: int
    columns_count: int
    current_version: int
    is_archived: bool
    created_at: datetime

    class Config:
        from_attributes = True