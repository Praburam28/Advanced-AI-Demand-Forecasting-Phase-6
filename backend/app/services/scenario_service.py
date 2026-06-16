from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.forecast_scenario import ForecastScenario
from app.models.forecast_project import ForecastProject
from app.schemas.scenario_schema import ScenarioCreate
from app.services.activity_service import log_activity
from app.utils.response_handler import success_response


def create_scenario(db: Session, data: ScenarioCreate, current_user):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == data.project_id,
        ForecastProject.owner_id == current_user.id,
        ForecastProject.status != "deleted"
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    scenario = ForecastScenario(
        name=data.name,
        sales_growth=data.sales_growth,
        seasonality=data.seasonality,
        demand_factor=data.demand_factor,
        notes=data.notes,
        project_id=data.project_id,
        created_by=current_user.id
    )

    db.add(scenario)
    db.commit()
    db.refresh(scenario)

    log_activity(
        db,
        data.project_id,
        current_user.id,
        "Scenario Created",
        f"Scenario '{scenario.name}' was created"
    )

    return scenario


def get_scenarios(db: Session, current_user):
    return (
        db.query(ForecastScenario)
        .join(ForecastProject, ForecastScenario.project_id == ForecastProject.id)
        .filter(
            ForecastProject.owner_id == current_user.id,
            ForecastProject.status != "deleted"
        )
        .all()
    )


def get_scenario_by_id(db: Session, scenario_id: int, current_user):
    scenario = (
        db.query(ForecastScenario)
        .join(ForecastProject, ForecastScenario.project_id == ForecastProject.id)
        .filter(
            ForecastScenario.id == scenario_id,
            ForecastProject.owner_id == current_user.id,
            ForecastProject.status != "deleted"
        )
        .first()
    )

    if not scenario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scenario not found"
        )

    return scenario


def update_scenario(db: Session, scenario_id: int, data: ScenarioCreate, current_user):
    scenario = get_scenario_by_id(db, scenario_id, current_user)

    scenario.name = data.name
    scenario.sales_growth = data.sales_growth
    scenario.seasonality = data.seasonality
    scenario.demand_factor = data.demand_factor
    scenario.notes = data.notes

    db.commit()
    db.refresh(scenario)

    log_activity(
        db,
        scenario.project_id,
        current_user.id,
        "Scenario Updated",
        f"Scenario '{scenario.name}' was updated"
    )

    return scenario


def delete_scenario(db: Session, scenario_id: int, current_user):
    scenario = get_scenario_by_id(db, scenario_id, current_user)

    project_id = scenario.project_id
    scenario_name = scenario.name

    log_activity(
        db,
        project_id,
        current_user.id,
        "Scenario Deleted",
        f"Scenario '{scenario_name}' was deleted"
    )

    db.delete(scenario)
    db.commit()

    return success_response("Scenario deleted successfully")


def compare_scenarios(db: Session, project_id: int, current_user):
    project = db.query(ForecastProject).filter(
        ForecastProject.id == project_id,
        ForecastProject.owner_id == current_user.id,
        ForecastProject.status != "deleted"
    ).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    scenarios = db.query(ForecastScenario).filter(
        ForecastScenario.project_id == project_id
    ).all()

    result = []

    for scenario in scenarios:
        base_demand = 10000

        adjusted_demand = base_demand + (
            base_demand * scenario.sales_growth / 100
        ) + (
            base_demand * scenario.seasonality / 100
        ) + (
            base_demand * scenario.demand_factor / 100
        )

        expected_revenue = adjusted_demand * 120
        expected_cost = expected_revenue * 0.65
        expected_profit = expected_revenue - expected_cost

        result.append({
            "scenario_id": scenario.id,
            "scenario_name": scenario.name,
            "sales_growth": scenario.sales_growth,
            "seasonality": scenario.seasonality,
            "demand_factor": scenario.demand_factor,
            "predicted_demand": round(adjusted_demand, 2),
            "expected_revenue": round(expected_revenue, 2),
            "expected_cost": round(expected_cost, 2),
            "expected_profit": round(expected_profit, 2)
        })

    log_activity(
        db,
        project_id,
        current_user.id,
        "Scenario Compared",
        f"Compared {len(result)} scenarios in workspace '{project.name}'"
    )

    return success_response(
        "Scenario comparison generated successfully",
        result
    )