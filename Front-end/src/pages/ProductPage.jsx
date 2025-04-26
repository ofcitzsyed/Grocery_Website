import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Minus, Plus } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data); // Set the fetched product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <main>
      <Header />
      <div className="p-8 max-w-[1200px] mx-auto">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Thumbnail"
                  className="w-24 h-24 border rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
            <img
              src={product.mainImage}
              alt="Main Product"
              className="rounded-lg object-cover w-full max-h-[350px] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <p className="text-gray-500 mt-1">{product.weight}</p>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-400 line-through">
                  MRP: ₹{product.mrp.toFixed(2)}
                </p>
                <p className="text-xl font-bold">Price: ₹{product.price}</p>
                <p className="text-green-600 text-sm font-medium">
                  You Save: {product.discount} OFF
                </p>
                <p className="text-xs text-gray-500">(inclusive of all taxes)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105 text-sm font-medium">
                Add to basket
              </button>
              <button className="border px-4 py-3 rounded-lg hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductPage;
