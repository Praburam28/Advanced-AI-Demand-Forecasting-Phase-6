from fastapi import HTTPException, status


def success_response(message: str, data=None):
    return {
        "status": "success",
        "message": message,
        "data": data
    }


def list_response(message: str, data=None, total: int = 0):
    return {
        "status": "success",
        "message": message,
        "total": total,
        "data": data or []
    }


def error_response(message: str, errors=None):
    return {
        "status": "error",
        "message": message,
        "errors": errors
    }


def not_found(message: str = "Resource not found"):
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=message
    )


def forbidden(message: str = "Permission denied"):
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=message
    )


def bad_request(message: str = "Bad request"):
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=message
    )