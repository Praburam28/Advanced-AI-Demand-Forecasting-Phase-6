from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base


class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False,
        index=True
    )

    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=True)

    priority = Column(String(20), default="normal")
    # low, normal, high, critical

    target_role = Column(String(50), nullable=True)
    # admin, manager, analyst, viewer, all

    is_active = Column(Boolean, default=True)

    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)