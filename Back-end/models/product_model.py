# models/product_model.py

from bson.objectid import ObjectId

class Product:
    @staticmethod
    def get_all_products(db):
        products = db.products.find()
        return [Product.serialize(product) for product in products]

    @staticmethod
    def get_product_by_id(db, product_id):
        # Search in products, featured_products, daily_best_sells
        collections = ['products', 'featured_products', 'daily_best_sells']
        for collection_name in collections:
            collection = db[collection_name]
            product = collection.find_one({"_id": ObjectId(product_id)})
            if product:
                return Product.serialize(product)
        return None

    @staticmethod
    def get_featured_products(db):
        products = db.featured_products.find()
        return [Product.serialize(product) for product in products]

    @staticmethod
    def get_daily_best_sells(db):
        products = db.daily_best_sells.find()
        return [Product.serialize(product) for product in products]

    @staticmethod
    def serialize(product):
        return {
            "id": str(product["_id"]),
            "name": product.get("name"),
            "price": product.get("price"),
            "description": product.get("description"),
            "image": product.get("image"),
            "category": product.get("category"),
            "oldPrice": product.get("oldPrice"),
            "isFeatured": product.get("is_featured", False),
            "isBestSeller": product.get("is_best_seller", False)
        }


class Category:
    @staticmethod
    def get_all_categories(db):
        categories = db.categories.find()
        return [Category.serialize(cat) for cat in categories]

    @staticmethod
    def serialize(cat):
        return {
            "id": str(cat["_id"]),
            "name": cat.get("name"),
            "items": cat.get("items"),
            "img": cat.get("img")
        }
