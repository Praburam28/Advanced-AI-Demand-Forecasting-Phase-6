from sqlalchemy.orm import Session
from app.models.kpi import KPI
from app.schemas.kpi_schema import KPICreate, KPIUpdate
from app.services.audit_service import create_audit_log


def calculate_kpi_status(actual_value, target_value, alert_threshold):
    if target_value == 0:
        return "on_track"

    achievement = (actual_value / target_value) * 100

    if alert_threshold is not None and achievement < alert_threshold:
        return "critical"

    if achievement < 80:
        return "warning"

    return "on_track"


def create_kpi(db: Session, data: KPICreate):
    status = calculate_kpi_status(
        data.actual_value,
        data.target_value,
        data.alert_threshold
    )

    kpi = KPI(
        organization_id=data.organization_id,
        name=data.name,
        description=data.description,
        target_value=data.target_value,
        actual_value=data.actual_value,
        forecast_value=data.forecast_value,
        unit=data.unit,
        period=data.period,
        alert_threshold=data.alert_threshold,
        status=status,
        created_by=data.created_by
    )

    db.add(kpi)
    db.commit()
    db.refresh(kpi)

    create_audit_log(
        db=db,
        module="KPI Management",
        action="CREATED",
        description=f"KPI '{kpi.name}' created",
        organization_id=kpi.organization_id,
        user_id=kpi.created_by,
        entity_type="kpi",
        entity_id=kpi.id
    )

    return kpi


def get_kpis(db: Session, organization_id: int):
    return db.query(KPI).filter(
        KPI.organization_id == organization_id
    ).order_by(KPI.id.desc()).all()


def get_kpi(db: Session, kpi_id: int):
    return db.query(KPI).filter(KPI.id == kpi_id).first()


def update_kpi(db: Session, kpi_id: int, data: KPIUpdate):
    kpi = get_kpi(db, kpi_id)

    if not kpi:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(kpi, key, value)

    kpi.status = calculate_kpi_status(
        kpi.actual_value,
        kpi.target_value,
        kpi.alert_threshold
    )

    db.commit()
    db.refresh(kpi)

    create_audit_log(
        db=db,
        module="KPI Management",
        action="UPDATED",
        description=f"KPI '{kpi.name}' updated",
        organization_id=kpi.organization_id,
        user_id=kpi.created_by,
        entity_type="kpi",
        entity_id=kpi.id
    )

    return kpi


def delete_kpi(db: Session, kpi_id: int):
    kpi = get_kpi(db, kpi_id)

    if not kpi:
        return None

    db.delete(kpi)
    db.commit()
    return kpi


def get_kpi_summary(db: Session, organization_id: int):
    kpis = db.query(KPI).filter(
        KPI.organization_id == organization_id
    ).all()

    if not kpis:
        return {
            "total_kpis": 0,
            "on_track": 0,
            "warning": 0,
            "critical": 0,
            "average_achievement": 0
        }

    achievements = []

    for kpi in kpis:
        if kpi.target_value:
            achievements.append((kpi.actual_value / kpi.target_value) * 100)

    avg_achievement = round(sum(achievements) / len(achievements), 2) if achievements else 0

    return {
        "total_kpis": len(kpis),
        "on_track": len([k for k in kpis if k.status == "on_track"]),
        "warning": len([k for k in kpis if k.status == "warning"]),
        "critical": len([k for k in kpis if k.status == "critical"]),
        "average_achievement": avg_achievement
    }