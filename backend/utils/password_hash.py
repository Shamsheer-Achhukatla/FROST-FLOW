from werkzeug.security import generate_password_hash, check_password_hash
import re

# 🔹 PASSWORD POLICY
MIN_LENGTH = 8


def hash_password(password: str) -> str:
    """
    Hash password using PBKDF2 (default Werkzeug secure method)
    """
    return generate_password_hash(password)


def verify_password(hashed_password: str, password: str) -> bool:
    """
    Verify entered password against stored hash
    """
    return check_password_hash(hashed_password, password)


def validate_password_strength(password: str):
    """
    Enforce strong password rules
    Returns (True, "") if valid
    Returns (False, reason) if invalid
    """

    if len(password) < MIN_LENGTH:
        return False, "Password must be at least 8 characters long"

    if not re.search(r"[A-Z]", password):
        return False, "Include at least one uppercase letter"

    if not re.search(r"[a-z]", password):
        return False, "Include at least one lowercase letter"

    if not re.search(r"[0-9]", password):
        return False, "Include at least one number"

    return True, ""