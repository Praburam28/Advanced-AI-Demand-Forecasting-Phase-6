from sqlalchemy.orm import Session
from app.models.planning import StrategicPlan
from app.schemas.planning_schema import StrategicPlanCreate, StrategicPlanUpdate
from app.services.audit_service import create_audit_log


def calculate_plan_metrics(business_target, forecasted_demand):
    variance = forecasted_demand - business_target

    if business_target == 0:
        achievement_percentage = 0
    else:
        achievement_percentage = round((forecasted_demand / business_target) * 100, 2)

    if achievement_percentage >= 95:
        status = "on_track"
        recommendation = "Forecast is aligned with business target."
    elif achievement_percentage >= 75:
        status = "at_risk"
        recommendation = "Forecast is below target. Review marketing, pricing, and supply plans."
    else:
        status = "behind_target"
        recommendation = "Forecast is significantly below target. Immediate strategic action is recommended."

    return variance, achievement_percentage, status, recommendation


def create_plan(db: Session, data: StrategicPlanCreate):
    variance, achievement, status, recommendation = calculate_plan_metrics(
        data.business_target,
        data.forecasted_demand
    )

    plan = StrategicPlan(
        organization_id=data.organization_id,
        plan_name=data.plan_name,
        plan_type=data.plan_type,
        year=data.year,
        quarter=data.quarter,
        business_target=data.business_target,
        forecasted_demand=data.forecasted_demand,
        actual_demand=data.actual_demand,
        variance=variance,
        achievement_percentage=achievement,
        status=status,
        recommendation=recommendation,
        created_by=data.created_by
    )

    db.add(plan)
    db.commit()
    db.refresh(plan)

    create_audit_log(
        db=db,
        module="Strategic Planning",
        action="CREATED",
        description=f"Strategic plan '{plan.plan_name}' created",
        organization_id=plan.organization_id,
        user_id=plan.created_by,
        entity_type="strategic_plan",
        entity_id=plan.id
    )

    return plan


def get_plans(db: Session, organization_id: int):
    return db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id
    ).order_by(StrategicPlan.id.desc()).all()


def get_plan(db: Session, plan_id: int):
    return db.query(StrategicPlan).filter(
        StrategicPlan.id == plan_id
    ).first()


def update_plan(db: Session, plan_id: int, data: StrategicPlanUpdate):
    plan = get_plan(db, plan_id)

    if not plan:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(plan, key, value)

    variance, achievement, status, recommendation = calculate_plan_metrics(
        plan.business_target,
        plan.forecasted_demand
    )

    plan.variance = variance
    plan.achievement_percentage = achievement
    plan.status = status
    plan.recommendation = recommendation

    db.commit()
    db.refresh(plan)

    create_audit_log(
        db=db,
        module="Strategic Planning",
        action="UPDATED",
        description=f"Strategic plan '{plan.plan_name}' updated",
        organization_id=plan.organization_id,
        user_id=plan.created_by,
        entity_type="strategic_plan",
        entity_id=plan.id
    )

    return plan


def delete_plan(db: Session, plan_id: int):
    plan = get_plan(db, plan_id)

    if not plan:
        return None

    db.delete(plan)
    db.commit()
    return plan


def get_annual_plans(db: Session, organization_id: int, year: int):
    return db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id,
        StrategicPlan.year == year,
        StrategicPlan.plan_type == "annual"
    ).all()


def get_quarterly_plans(db: Session, organization_id: int, year: int, quarter: str):
    return db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id,
        StrategicPlan.year == year,
        StrategicPlan.quarter == quarter,
        StrategicPlan.plan_type == "quarterly"
    ).all()


def get_planning_summary(db: Session, organization_id: int):
    plans = db.query(StrategicPlan).filter(
        StrategicPlan.organization_id == organization_id
    ).all()

    if not plans:
        return {
            "total_plans": 0,
            "on_track": 0,
            "at_risk": 0,
            "behind_target": 0,
            "average_achievement": 0
        }

    avg_achievement = round(
        sum(plan.achievement_percentage for plan in plans) / len(plans),
        2
    )

    return {
        "total_plans": len(plans),
        "on_track": len([p for p in plans if p.status == "on_track"]),
        "at_risk": len([p for p in plans if p.status == "at_risk"]),
        "behind_target": len([p for p in plans if p.status == "behind_target"]),
        "average_achievement": avg_achievement
    }