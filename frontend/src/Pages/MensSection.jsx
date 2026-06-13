import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import FilterSidebar from "../Components/Layout/FilterSidebar";
import { fetchproductbyfilters } from "../redux/slices/productslice";

export default function MensSection() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("Men");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const getImageUrl = (product) => {
    if (!product.images?.[0]) return "https://via.placeholder.com/300";

    const img = product.images[0];

    if (typeof img === "string") {
      return img.startsWith("http") ? img : `http://localhost:5000/${img}`;
    }

    if (typeof img === "object" && img.url) {
      return img.url.startsWith("http")
        ? img.url
        : `http://localhost:5000/${img.url}`;
    }

    return "https://via.placeholder.com/300";
  };

  useEffect(() => {
    dispatch(
      fetchproductbyfilters({
        gender: selectedGender,
        category: selectedCategory,
        color: selectedColor,
        size: selectedSizes.join(","),
        material: selectedMaterial,
        limit: 40,
      })
    );
  }, [
    dispatch,
    selectedGender,
    selectedCategory,
    selectedColor,
    selectedSizes,
    selectedMaterial,
  ]);

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-8 sm:py-10 md:flex-row md:px-6 lg:px-8">
      <div className="w-full md:w-64 lg:w-72 md:shrink-0">
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

      <section className="w-full flex-1 min-w-0 py-4 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[3px] sm:tracking-[4px] text-[#8b7355]">
                MEN COLLECTION
              </p>

              <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#1a1a1a]">
                Timeless Fashion
                <span className="block text-[#8b7355]">
                  Crafted For Modern Men
                </span>
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-500">Loading Products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-500">No Products Found</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="h-[260px] sm:h-[300px] lg:h-[320px] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1 p-4 sm:p-5">
                    <p className="text-xs uppercase text-[#8b7355] tracking-wider">
                      {product.category}
                    </p>

                    <h4 className="text-sm font-semibold sm:text-base truncate">
                      {product.name}
                    </h4>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <p className="font-semibold text-base sm:text-lg">₹{product.price}</p>

                      <button className="rounded-full border p-2 sm:p-3 transition hover:bg-black hover:text-white">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}