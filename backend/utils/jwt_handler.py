# utils/jwt_handler.py
import jwt, os, datetime
from flask import request
from dotenv import load_dotenv
load_dotenv()

SECRET = os.getenv("SECRET_KEY")

def create_token(data):
    return jwt.encode(
        {"user": data, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3)},
        SECRET, algorithm="HS256"
    )

def verify_token():
    token = request.headers.get("Authorization")
    if not token: return None
    try:
        decoded = jwt.decode(token, SECRET, algorithms=["HS256"])
        return decoded["user"]
    except:
        return None
