from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.kpi_schema import KPICreate, KPIUpdate, KPIResponse
from app.services.kpi_service import (
    create_kpi,
    get_kpis,
    get_kpi,
    update_kpi,
    delete_kpi,
    get_kpi_summary
)

router = APIRouter(
    prefix="/api/kpis",
    tags=["Advanced KPI Management"]
)

@router.post("/", response_model=KPIResponse)
def create(data: KPICreate, db: Session = Depends(get_db)):
    return create_kpi(db, data)

@router.get("/{organization_id}", response_model=List[KPIResponse])
def list_all(organization_id: int, db: Session = Depends(get_db)):
    return get_kpis(db, organization_id)

@router.get("/detail/{kpi_id}", response_model=KPIResponse)
def detail(kpi_id: int, db: Session = Depends(get_db)):
    kpi = get_kpi(db, kpi_id)

    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")

    return kpi

@router.put("/{kpi_id}", response_model=KPIResponse)
def update(kpi_id: int, data: KPIUpdate, db: Session = Depends(get_db)):
    kpi = update_kpi(db, kpi_id, data)

    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")

    return kpi

@router.delete("/{kpi_id}")
def delete(kpi_id: int, db: Session = Depends(get_db)):
    kpi = delete_kpi(db, kpi_id)

    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")

    return {"message": "KPI deleted successfully"}

@router.get("/summary/{organization_id}")
def summary(organization_id: int, db: Session = Depends(get_db)):
    return get_kpi_summary(db, organization_id)