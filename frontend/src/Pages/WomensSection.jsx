import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterSidebar from "../Components/Layout/FilterSidebar";

export default function WomensSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("Women");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const getImageUrl = (product) => {
    if (!product.images?.[0]) {
      return "https://via.placeholder.com/300";
    }

    const img = product.images[0];

    if (typeof img === "string") {
      return img.startsWith("http")
        ? img
        : `http://localhost:5000/${img}`;
    }

    if (typeof img === "object" && img.url) {
      return img.url.startsWith("http")
        ? img.url
        : `http://localhost:5000/${img.url}`;
    }

    return "https://via.placeholder.com/300";
  };

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "http://localhost:5000/api/products",
          {
            params: {
              gender: selectedGender,
              category: selectedCategory,
              color: selectedColor,
              material: selectedMaterial,
              limit: 40,
            },
          }
        );

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching women products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, [
    selectedCategory,
    selectedGender,
    selectedColor,
    selectedMaterial,
  ]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
          />
        </div>

        {/* Products Section */}
        <section className="flex-1 bg-white">
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
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-500 text-lg">
                Loading Products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-500 text-lg">
                No Products Found
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group rounded-[28px] bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="overflow-hidden rounded-t-[28px]">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="h-[350px] w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs uppercase text-[#8b7355]">
                      {product.category}
                    </p>

                    <h4 className="font-semibold text-gray-900">
                      {product.name}
                    </h4>

                    <div className="flex justify-between items-center">
                      <p className="font-medium text-lg">
                        ₹{product.price}
                      </p>

                      <div className="p-3 rounded-full border hover:bg-black hover:text-white transition">
                        <ShoppingBag size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}