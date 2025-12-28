from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["frostflow"]
users = db["users"]
orders = db["orders"]
bookings = db["bookings"]
services = db["services"] 
products = db["products"]    # ⭐ ADD THIS

