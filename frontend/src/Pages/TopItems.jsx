import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

export default function TopItems() {
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "http://localhost:5000/api/products/best-seller"
        );

        console.log("API RESPONSE:", data);

        // Always ensure array
        setTopItems(Array.isArray(data) ? data : [data]);

      } catch (error) {
        console.error("Error fetching best sellers:", error);
        setError("Failed to load products");
        setTopItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  // IMAGE HELPER
  const getImageUrl = (product) => {
    return product.images?.[0]?.url || "https://via.placeholder.com/300";
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading top products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {topItems.map((product) => (
            <div
              key={product._id}
              className="group rounded-[28px] bg-white shadow-sm hover:-translate-y-2 transition"
            >

              {/* Image */}
              <div className="overflow-hidden rounded-t-[28px]">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="h-[350px] w-full object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Details */}
              <div className="p-5 space-y-2">

                <p className="text-xs uppercase text-[#8b7355]">
                  {product.category}
                </p>

                <h4 className="font-semibold">
                  {product.name}
                </h4>

                <div className="flex justify-between items-center">
                  <p className="font-medium">
                    ₹{product.price}
                  </p>

                  <button className="p-3 rounded-full border hover:bg-black hover:text-white transition">
                    <ShoppingBag size={18} />
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}