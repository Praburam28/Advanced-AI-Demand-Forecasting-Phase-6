from sqlalchemy.orm import Session
from app.models.organization_user import OrganizationUser
from app.schemas.organization_user_schema import OrganizationUserCreate

def add_user_to_organization(db: Session, data: OrganizationUserCreate):
    org_user = OrganizationUser(**data.dict())
    db.add(org_user)
    db.commit()
    db.refresh(org_user)
    return org_user

def get_organization_users(db: Session, organization_id: int):
    return db.query(OrganizationUser).filter(
        OrganizationUser.organization_id == organization_id
    ).all()

def remove_user_from_organization(db: Session, org_user_id: int):
    org_user = db.query(OrganizationUser).filter(
        OrganizationUser.id == org_user_id
    ).first()

    if not org_user:
        return None

    db.delete(org_user)
    db.commit()
    return org_user