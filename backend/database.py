# database.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsAllowInvalidCertificates=True,
    serverSelectionTimeoutMS=20000
)

db = client["frostflow"]
users = db["users"]
orders = db["orders"]
bookings = db["bookings"]
products = db["products"]
services = db["services"]
