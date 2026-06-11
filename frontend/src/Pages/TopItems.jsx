import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchBestSellers } from "../redux/slices/productslice";

export default function TopItems() {
  const dispatch = useDispatch();
 

  const {
    bestSellers,
    status,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBestSellers());
    }
  }, [dispatch, status]);

  // SAFE ARRAY
  const products = Array.isArray(bestSellers)
    ? bestSellers
    : bestSellers?.products || [];

  console.log("bestSellers:", bestSellers);
  console.log("products:", products);
  console.log(fetchBestSellers())

  const getImageUrl = (product) => {
    if (!product?.images?.length) {
      return "https://via.placeholder.com/300";
    }

    const image = product.images[0];

    if (typeof image === "string") {
      return image.startsWith("http")
        ? image
        : `http://localhost:5000/${image}`;
    }

    return image.url || "https://via.placeholder.com/300";
  };

  if (status === "loading") {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading top products...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="py-20 text-center text-red-500">
        {error || "Failed to load products"}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Top Selling Items
          </h2>
          <p className="mt-2 text-gray-600">
            Discover our most popular fashion picks
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group rounded-[28px] bg-white shadow-sm transition hover:-translate-y-2"
              >
                <div className="overflow-hidden rounded-t-[28px]">
                  <img
                    src={getImageUrl(product)}
                    alt={product.name}
                    className="h-[350px] w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 p-5">
                  <p className="text-xs uppercase text-[#8b7355]">
                    {product.category}
                  </p>

                  <h4 className="font-semibold">
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      ₹{product.price}
                    </p>

                    <div className="rounded-full border p-3 transition hover:bg-black hover:text-white">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            No top-selling products found.
          </div>
        )}
      </div>
    </section>
  );
}