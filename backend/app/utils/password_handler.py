from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def _normalize_password(password: str) -> str:
    if not password:
        return ""

    # bcrypt supports max 72 bytes
    password_bytes = password.encode("utf-8")[:72]
    return password_bytes.decode("utf-8", errors="ignore")


def hash_password(password: str) -> str:
    password = _normalize_password(password)
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password = _normalize_password(plain_password)
    return pwd_context.verify(plain_password, hashed_password)