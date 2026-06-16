from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey
)
from datetime import datetime
from app.database.db import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=True)

    notification_type = Column(
        String(50),
        default="info"
    )
    # info, warning, success, error, approval, workflow

    is_read = Column(Boolean, default=False)

    # Existing User Notification
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    # PHASE 6 ENTERPRISE
    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    role = Column(
        String(50),
        nullable=True
    )
    # admin, manager, analyst, viewer

    is_announcement = Column(
        Boolean,
        default=False
    )

    announcement_priority = Column(
        String(20),
        default="normal"
    )
    # low, normal, high, critical

    source_module = Column(
        String(100),
        nullable=True
    )
    # forecast, workflow, governance, planning, kpi

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )