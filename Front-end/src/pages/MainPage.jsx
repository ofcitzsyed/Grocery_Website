import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import heroBg from "../assets/hero-bg.png";
import veggiePattern from "../assets/bg-veggi.png";
import veggieBag from "../assets/veggie-bag.png";
import Header from "../component/Header";
import Footer from "../component/Footer";

// Fetch data from APIs


const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const fetchFeaturedProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/featured_products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

const fetchDailyBestSells = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/daily_best_sells");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily best sells:", error);
    return [];
  }
};

const MainPage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dailyBestSells, setDailyBestSells] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 4;

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);

      const featuredData = await fetchFeaturedProducts();
      setFeaturedProducts(featuredData);

      const dailyBestSellsData = await fetchDailyBestSells();
      setDailyBestSells(dailyBestSellsData);
    };
    loadData();
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + cardsPerPage < featuredProducts.length) setStartIndex(startIndex + 1);
  };

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] overflow-hidden" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 opacity-60 z-0" style={{ backgroundImage: `url(${veggiePattern})`, backgroundRepeat: "repeat", backgroundSize: "860px" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-8 w-full flex items-center justify-between">
          <div className="max-w-lg space-y-8 py-26 ml-[-178px]">
            <h1 className="text-5xl font-bold text-[#1d2a3b] leading-tight">
              Don’t miss our daily <br /> amazing deals.
            </h1>
            <p className="text-gray-500 text-lg">Save up to 60% off on your first order</p>
            <div className="flex items-center bg-white rounded-md overflow-hidden w-full max-w-md shadow-sm">
              <div className="p-4 text-gray-400">
                <FaPaperPlane />
              </div>
              <input type="email" placeholder="Enter your email address" className="flex-1 px-2 py-3 focus:outline-none" />
              <button className="bg-green-500 text-white px-6 py-3">Subscribe</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 translate-x-[32%] z-10">
            <img src={veggieBag} alt="veggies" className="w-[650px] object-contain" />
          </div>
        </div>
      </section>

      {/* Explore Categories Section */}
      <div className="px-20 py-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Explore Categories</h2>
        <div className="flex items-center gap-3">
          <button onClick={handlePrev} className="p-2 rounded-full border hover:bg-gray-200 transition">
            <ChevronLeft />
          </button>
          <div className="grid grid-cols-4 gap-6 w-full">
            {categories.slice(startIndex, startIndex + 4).map((category, index) => (
              <div key={category.id || index} className="bg-gray-100 rounded-xl p-5 text-center group transition duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                <img src={`${category.img}`} alt={category.name} className="h-60 mx-auto rounded-xl shadow-md transition-transform duration-300 group-hover:-translate-y-2" />
                <h3 className="text-lg font-medium mt-3">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.items}</p>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="p-2 rounded-full border hover:bg-gray-200 transition">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-20 py-10">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="flex items-center gap-3">
          <button onClick={handlePrev} className="p-2 bg-gray-100 rounded-full hover:bg-gray-300">
            <ChevronLeft />
          </button>
          <div className="grid grid-cols-4 gap-5 w-full">
            {featuredProducts.length > 0 && featuredProducts.slice(startIndex, startIndex + cardsPerPage).map((product, index) => (
              <div key={product.id || index} className="border p-4 rounded-lg hover:shadow-xl transition">
                <img src={product.image} alt={product.name} className="h-auto w-full object-contain mb-3" />
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-green-600 font-semibold">${product.price}</p>
                  {product.oldPrice && <p className="line-through text-gray-400 text-sm">${product.oldPrice}</p>}
                </div>
                <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-1 rounded mt-2 w-full">Add</button>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="p-2 bg-gray-100 rounded-full hover:bg-gray-300">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Daily Best Sells Section */}
      <section className="px-10 py-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Daily Best Sells</h2>
        <div className="grid grid-cols-4 gap-6">
          {dailyBestSells.slice(0, 4).map((product) => (
            <div key={product.id} className="relative group p-4 bg-white rounded-xl shadow hover:scale-105 transition-transform duration-300">
              <img src={product.image} alt={product.name} className="h-auto w-full object-contain mb-3" />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 py-1 rounded">-20%</div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">Category: {product.category}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                  <ShoppingCart size={16} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MainPage;
