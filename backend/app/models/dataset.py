from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey
)
from datetime import datetime
from app.database.db import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)

    rows_count = Column(Integer, default=0)
    columns_count = Column(Integer, default=0)

    current_version = Column(Integer, default=1)

    is_archived = Column(Boolean, default=False)

    # Existing Relationships
    user_id = Column(Integer, ForeignKey("users.id"))
    project_id = Column(
        Integer,
        ForeignKey("forecast_projects.id"),
        nullable=True
    )

    # NEW PHASE 6
    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )