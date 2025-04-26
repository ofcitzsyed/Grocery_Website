from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["Grocery_Website"]  # Name of your database

class Cart:
    @staticmethod
    def add_to_cart(user_id, product_id, quantity):
        cart_item = {
            "user_id": ObjectId(user_id),
            "product_id": ObjectId(product_id),
            "quantity": quantity
        }
        result = db.cart.insert_one(cart_item)
        # Convert ObjectId to string before returning
        cart_item["_id"] = str(result.inserted_id)
        cart_item["user_id"] = str(cart_item["user_id"])
        cart_item["product_id"] = str(cart_item["product_id"])
        return cart_item

    @staticmethod
    def get_cart(user_id):
        cart_items = list(db.cart.find({"user_id": ObjectId(user_id)}))
        for item in cart_items:
            item["_id"] = str(item["_id"])
            item["user_id"] = str(item["user_id"])
            item["product_id"] = str(item["product_id"])
        return cart_items

    @staticmethod
    def update_quantity(cart_item_id, quantity):
        result = db.cart.update_one(
            {"_id": ObjectId(cart_item_id)},
            {"$set": {"quantity": quantity}}
        )
        return result.modified_count > 0

    @staticmethod
    def delete_cart_item(cart_item_id):
        result = db.cart.delete_one({"_id": ObjectId(cart_item_id)})
        return result.deleted_count > 0
