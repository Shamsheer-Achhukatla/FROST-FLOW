from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)  # SSL FIX
db = client.frostflow

# Collections
users_col = db.users
products_col = db.products
orders_col = db.orders
bookings_col = db.bookings
services_col = db.services
