import jwt
import os
from datetime import datetime, timedelta
from flask import request
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TOKEN_EXPIRE_DAYS = 3


# 🔹 CREATE TOKEN
def create_token(user_id):
    payload = {
        "user": user_id,
        "iat": datetime.utcnow(),  # issued at
        "exp": datetime.utcnow() + timedelta(days=TOKEN_EXPIRE_DAYS)
    }

    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)

    # PyJWT may return bytes in older versions
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return token


# 🔹 VERIFY TOKEN
def verify_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None

    # Support: "Bearer <token>" OR raw token
    parts = auth_header.split(" ")

    token = parts[1] if len(parts) == 2 else parts[0]

    try:
        decoded = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return decoded.get("user")

    except jwt.ExpiredSignatureError:
        return None  # token expired

    except jwt.InvalidTokenError:
        return None  # tampered or invalid