from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.workflow_schema import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowResponse
)

from app.services.workflow_service import (
    create_workflow,
    get_workflows,
    get_workflow,
    update_workflow,
    delete_workflow,
    execute_workflow,
    get_workflow_logs,
    get_workflow_summary
)

router = APIRouter(
    prefix="/api/workflows",
    tags=["Workflow Automation"]
)


@router.post("/", response_model=WorkflowResponse)
def create(
    data: WorkflowCreate,
    db: Session = Depends(get_db)
):
    return create_workflow(db, data)


@router.get(
    "/organization/{organization_id}",
    response_model=List[WorkflowResponse]
)
def list_workflows(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_workflows(
        db,
        organization_id
    )


@router.get("/{workflow_id}")
def detail(
    workflow_id: int,
    db: Session = Depends(get_db)
):
    workflow = get_workflow(
        db,
        workflow_id
    )

    if not workflow:
        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return workflow


@router.put(
    "/{workflow_id}",
    response_model=WorkflowResponse
)
def update(
    workflow_id: int,
    data: WorkflowUpdate,
    db: Session = Depends(get_db)
):
    workflow = update_workflow(
        db,
        workflow_id,
        data
    )

    if not workflow:
        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return workflow


@router.delete("/{workflow_id}")
def delete(
    workflow_id: int,
    db: Session = Depends(get_db)
):
    workflow = delete_workflow(
        db,
        workflow_id
    )

    if not workflow:
        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return {
        "message": "Workflow deleted successfully"
    }


@router.post("/execute/{workflow_id}")
def execute(
    workflow_id: int,
    db: Session = Depends(get_db)
):
    result = execute_workflow(
        db,
        workflow_id
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Workflow not found"
        )

    return result


@router.get("/logs/{organization_id}")
def logs(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_workflow_logs(
        db,
        organization_id
    )


@router.get("/summary/{organization_id}")
def summary(
    organization_id: int,
    db: Session = Depends(get_db)
):
    return get_workflow_summary(
        db,
        organization_id
    )