import secrets
from datetime import datetime, timedelta

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.password_schema import ForgotPasswordRequest, ResetPasswordRequest
from app.utils.hashing import hash_password


def forgot_password(db: Session, data: ForgotPasswordRequest):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    token = secrets.token_urlsafe(32)

    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)

    db.commit()

    reset_link = f"http://localhost:5173/reset-password/{token}"

    return {
        "message": "Password reset link generated successfully",
        "reset_link": reset_link,
        "token": token
    }


def reset_password(db: Session, data: ResetPasswordRequest):
    user = db.query(User).filter(User.reset_token == data.token).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reset token"
        )

    if not user.reset_token_expiry or user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token expired"
        )

    user.password = hash_password(data.password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return {
        "message": "Password reset successfully"
    }