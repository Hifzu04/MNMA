import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [isButtondisabled, setIsButtondisabled] = useState(false);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/500";

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

    return "https://via.placeholder.com/500";
  };

  const handleQuantityChange = (type) => {
    if (type === "Minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "Plus") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    setIsButtondisabled(true);

    console.log("Added To Cart:", {
      product,
      quantity,
    });

    setTimeout(() => {
      setIsButtondisabled(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(res.data);
        setSelectedImage(getImageUrl(res.data.images?.[0]));
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Left Side Images */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={getImageUrl(img)}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              onClick={() => setSelectedImage(getImageUrl(img))}
            />
          ))}
        </div>

        <div className="flex-1">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Right Side Content */}
      <div>
        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <p className="text-2xl font-semibold mt-4">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-700">
          {product.description}
        </p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Color
            </h3>

            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-8 h-8 rounded-full border"
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Size
            </h3>

            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md hover:bg-black hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6 mt-6">
          <p className="text-gray-700">
            Quantity:
          </p>

          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() =>
                handleQuantityChange("Minus")
              }
              className="px-2 py-1 bg-gray-200 rounded text-lg"
            >
              -
            </button>

            <span className="text-lg">
              {quantity}
            </span>

            <button
              onClick={() =>
                handleQuantityChange("Plus")
              }
              className="px-2 py-1 bg-gray-200 rounded text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
            isButtondisabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-900"
          }`}
          disabled={isButtondisabled}
        >
          {isButtondisabled
            ? "Adding..."
            : "ADD TO CART"}
        </button>

        {/* Characteristics */}
        <div className="mt-10 text-gray-700">
          <h3 className="text-xl font-bold mb-4">
            Characteristics:
          </h3>

          <table className="w-full text-left text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="py-1">
                  Brand
                </td>
                <td className="py-1">
                  {product.brand || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="py-1">
                  Material
                </td>
                <td className="py-1">
                  {product.material || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}