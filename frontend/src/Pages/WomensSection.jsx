import React, { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import axios from "axios";

// IMPORT IMAGE
import Women from "../assets/WomenCollectionHome.png";

export default function WomensSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH WOMEN PRODUCTS
  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/women"
        );

        // CHECK BACKEND RESPONSE
        setProducts(res.data.products || res.data);
      } catch (error) {
        console.log("Error fetching women products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <section className="w-full bg-[#f8f5f0] py-20">
      <div className="container mx-auto px-4 md:px-8">

        {/* TOP SECTION */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[4px] text-[#8b7355]">
              WOMEN COLLECTION
            </p>

            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-[#1a1a1a] md:text-5xl">
              Timeless Fashion
              <span className="block text-[#8b7355]">
                Crafted For Modern Women
              </span>
            </h2>
          </div>

          <button className="group flex w-fit items-center gap-2 rounded-full border border-[#d6c7b2] px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white">
            View All

            <ArrowRight
              size={18}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* FEATURED BANNER */}
        <div className="mb-16 grid overflow-hidden rounded-[30px] bg-[#ebe3d7] lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full overflow-hidden">
            <img
              src={Women}
              alt="women fashion"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-8 md:p-14">

            <span className="mb-5 w-fit rounded-full bg-white px-4 py-1 text-xs font-medium uppercase tracking-widest text-[#8b7355]">
              New Season
            </span>

            <h3 className="mb-6 text-3xl font-semibold leading-tight text-[#1a1a1a] md:text-5xl">
              Minimal.
              <span className="block text-[#8b7355]">
                Elegant. Premium.
              </span>
            </h3>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-[#5c5c5c]">
              Explore premium women’s fashion designed with modern
              silhouettes, luxury aesthetics, and timeless elegance.
            </p>

            <button className="flex w-fit items-center gap-2 rounded-full bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105">
              Shop Collection
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg text-gray-500">
              Loading Products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg text-gray-500">
              No Products Found
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `http://localhost:5000/${product.image}`
                    }
                    alt={product.name}
                    className="h-[350px] w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-black px-4 py-1 text-xs font-medium uppercase tracking-wider text-white">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="space-y-3 p-5">

                  <p className="text-xs uppercase tracking-[3px] text-[#8b7355]">
                    {product.category}
                  </p>

                  <h4 className="text-lg font-semibold text-[#1a1a1a]">
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between">

                    <p className="text-lg font-medium text-[#1a1a1a]">
                      ₹{product.price}
                    </p>

                    <button className="rounded-full border border-[#e7dfd4] p-3 transition-all duration-300 hover:bg-black hover:text-white">
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