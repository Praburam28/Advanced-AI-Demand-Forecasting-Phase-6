from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, login_user

from app.schemas.password_schema import ForgotPasswordRequest, ResetPasswordRequest
from app.services.password_service import forgot_password, reset_password

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(db, data)

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(db, data)

@router.post("/forgot-password")
def forgot_password_api(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    return forgot_password(db, data)


@router.post("/reset-password")
def reset_password_api(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    return reset_password(db, data)