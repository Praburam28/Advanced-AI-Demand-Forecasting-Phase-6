from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.planning_schema import (
    StrategicPlanCreate,
    StrategicPlanUpdate,
    StrategicPlanResponse
)
from app.services.planning_service import (
    create_plan,
    get_plans,
    get_plan,
    update_plan,
    delete_plan,
    get_annual_plans,
    get_quarterly_plans,
    get_planning_summary
)

router = APIRouter(
    prefix="/api/strategic-planning",
    tags=["Strategic Planning"]
)

@router.post("/", response_model=StrategicPlanResponse)
def create(data: StrategicPlanCreate, db: Session = Depends(get_db)):
    return create_plan(db, data)

@router.get("/{organization_id}", response_model=List[StrategicPlanResponse])
def list_all(organization_id: int, db: Session = Depends(get_db)):
    return get_plans(db, organization_id)

@router.get("/detail/{plan_id}", response_model=StrategicPlanResponse)
def detail(plan_id: int, db: Session = Depends(get_db)):
    plan = get_plan(db, plan_id)

    if not plan:
        raise HTTPException(status_code=404, detail="Strategic plan not found")

    return plan

@router.put("/{plan_id}", response_model=StrategicPlanResponse)
def update(plan_id: int, data: StrategicPlanUpdate, db: Session = Depends(get_db)):
    plan = update_plan(db, plan_id, data)

    if not plan:
        raise HTTPException(status_code=404, detail="Strategic plan not found")

    return plan

@router.delete("/{plan_id}")
def delete(plan_id: int, db: Session = Depends(get_db)):
    plan = delete_plan(db, plan_id)

    if not plan:
        raise HTTPException(status_code=404, detail="Strategic plan not found")

    return {"message": "Strategic plan deleted successfully"}

@router.get("/annual/{organization_id}/{year}", response_model=List[StrategicPlanResponse])
def annual(organization_id: int, year: int, db: Session = Depends(get_db)):
    return get_annual_plans(db, organization_id, year)

@router.get("/quarterly/{organization_id}/{year}/{quarter}", response_model=List[StrategicPlanResponse])
def quarterly(
    organization_id: int,
    year: int,
    quarter: str,
    db: Session = Depends(get_db)
):
    return get_quarterly_plans(db, organization_id, year, quarter)

@router.get("/summary/{organization_id}")
def summary(organization_id: int, db: Session = Depends(get_db)):
    return get_planning_summary(db, organization_id)