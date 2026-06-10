import React, { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import axios from "axios";

// IMAGE
import Women from "../assets/WomenCollectionHome.png";

export default function MensSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to safely get image URL
  const getImageUrl = (product) => {
    if (!product.images?.[0]) return "https://via.placeholder.com/300";
    
    const img = product.images[0];
    
    // If it's a string
    if (typeof img === "string") {
      return img.startsWith("http") ? img : `http://localhost:5000/${img}`;
    }
    
    // If it's an object with .url property
    if (typeof img === "object" && img.url) {
      return img.url.startsWith("http") ? img.url : `http://localhost:5000/${img.url}`;
    }
    
    return "https://via.placeholder.com/300";
  };

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:5000/api/products", {
          params: {
            gender: "Men",
            limit: 40,
          },
        });

        setProducts(res.data || []);

      } catch (error) {
        console.log("Error fetching women products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <section className="w-full bg-[#f8f5f0] py-20">
      <div className=" mx-auto px-4 md:px-8">

        {/* TOP SECTION */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[4px] text-[#8b7355]">
              MEN COLLECTION
            </p>

            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-[#1a1a1a] md:text-5xl">
              Timeless Fashion
              <span className="block text-[#8b7355]">
                Crafted For Modern Men
              </span>
            </h2>
          </div>

          
        </div>

        {/* BANNER */}
       

        {/* PRODUCTS */}
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading Products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">No Products Found</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="group rounded-[28px] bg-white shadow-sm hover:-translate-y-2 transition"
              >

                <div className="overflow-hidden">
                  <img
                    src={getImageUrl(product)}
                    alt={product.name}
                    className="h-[350px] w-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-5 space-y-2">

                  <p className="text-xs uppercase text-[#8b7355]">
                    {product.category}
                  </p>

                  <h4 className="font-semibold">{product.name}</h4>

                  <div className="flex justify-between items-center">
                    <p className="font-medium">₹{product.price}</p>

                    <button className="p-3 rounded-full border hover:bg-black hover:text-white">
                      <ShoppingBag size={18} />
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}