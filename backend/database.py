from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["frostandflow"]  # database name

users_collection = db["users"]
products_collection = db["products"]
orders_collection = db["orders"]
service_collection = db["service"]
