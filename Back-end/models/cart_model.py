from pymongo import MongoClient;
from bson import ObjectId;
import os;
  # Adjust the import based on your project structure
from dotenv import load_dotenv;


# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["Grocery_Website"]  # Name of your database

class Cart:
    @staticmethod
    def add_to_cart(user_id, product_id, quantity, product, price, mrp):
        cart_item = {
            "user_id": ObjectId(user_id),
            "product_id": ObjectId(product_id),
            "quantity": quantity,
            "product": product,  # from params
            "price": price,
            "mrp": mrp
        }
        result = db.cart.insert_one(cart_item)
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

        # First use original ObjectId to query product
            product = db.products.find_one({"_id": item["product_id"]})

        # Then convert to string (after the lookup!)
            item["product_id"] = str(item["product_id"])

            if product:
                product["_id"] = str(product["_id"])
                item["product"] = {
                    "id": product["_id"],
                    "name": product.get("name", "Unknown"),
                    "image": product.get("image", ""),
                    "price": product.get("price", 0),
                    "oldPrice": product.get("oldPrice", 0),
                    "weight": product.get("weight", "")
                }
                item["price"] = product.get("price", 0)
                item["mrp"] = product.get("oldPrice", 0)
            else:
                item["product"] = None
                item["price"] = 1.30
                item["mrp"] = 2.70
                item["image"] = "https://via.placeholder.com/150?text=No+Image"
                  # Default image URL

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
