from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.scenario_schema import ScenarioCreate, ScenarioResponse
from app.services.scenario_service import (
    create_scenario,
    get_scenarios,
    get_scenario_by_id,
    update_scenario,
    delete_scenario,
    compare_scenarios
)
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/scenarios",
    tags=["Scenario Planning"]
)


@router.post("/", response_model=ScenarioResponse)
def create_new_scenario(
    data: ScenarioCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_scenario(db, data, current_user)


@router.get("/", response_model=List[ScenarioResponse])
def list_scenarios(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_scenarios(db, current_user)


@router.get("/{scenario_id}", response_model=ScenarioResponse)
def get_scenario(
    scenario_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_scenario_by_id(db, scenario_id, current_user)


@router.put("/{scenario_id}", response_model=ScenarioResponse)
def edit_scenario(
    scenario_id: int,
    data: ScenarioCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_scenario(db, scenario_id, data, current_user)


@router.delete("/{scenario_id}")
def remove_scenario(
    scenario_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_scenario(db, scenario_id, current_user)


@router.get("/compare/{project_id}")
def compare_project_scenarios(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return compare_scenarios(db, project_id, current_user)