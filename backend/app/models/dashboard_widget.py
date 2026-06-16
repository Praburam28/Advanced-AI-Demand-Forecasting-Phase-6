from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class DashboardWidget(Base):
    __tablename__ = "dashboard_widgets"

    id = Column(Integer, primary_key=True, index=True)
    widget_name = Column(String(150), nullable=False)
    widget_type = Column(String(100), nullable=False)
    layout_config = Column(Text, nullable=True)
    filters_config = Column(Text, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)