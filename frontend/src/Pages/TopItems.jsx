import React from "react";

export default function TopItems() {
  const topItems = [
    {
      id: 1,
      name: "Classic Leather Jacket",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      price: 2000.5,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
    {
      id: 3,
      name: "Premium Hoodie",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      price: 1799.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    },
    {
      id: 6,
      name: "Sports Sneakers",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
  ];

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Top Selling Items
          </h2>
          <p className="text-gray-600 mt-2">
            Discover our most popular fashion picks
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₹{item.price}
                </p>

                <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Add to Cart
                </button>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}