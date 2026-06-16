from sqlalchemy.orm import Session
from app.models.organization import Organization
from app.schemas.organization_schema import OrganizationCreate, OrganizationUpdate

def create_organization(db: Session, data: OrganizationCreate):
    org = Organization(**data.dict())
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

def get_organizations(db: Session):
    return db.query(Organization).order_by(Organization.id.desc()).all()

def get_organization(db: Session, org_id: int):
    return db.query(Organization).filter(Organization.id == org_id).first()

def update_organization(db: Session, org_id: int, data: OrganizationUpdate):
    org = get_organization(db, org_id)
    if not org:
        return None

    for key, value in data.dict(exclude_unset=True).items():
        setattr(org, key, value)

    db.commit()
    db.refresh(org)
    return org

def delete_organization(db: Session, org_id: int):
    org = get_organization(db, org_id)
    if not org:
        return None

    db.delete(org)
    db.commit()
    return org