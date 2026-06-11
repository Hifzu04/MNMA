import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountprice: "",
    countinstock: "",
    category: "",
    brand: "",
    collections: "",
    material: "",
    gender: "",
    sku: "",
    sizes: "",
    colors: "",
    tags: "",
    weight: "",
  });

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const productData = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        discountprice: Number(product.discountprice) || 0,
        countinstock: Number(product.countinstock),
        category: product.category,
        brand: product.brand,
        collections: product.collections,
        material: product.material,
        gender: product.gender,
        sku: product.sku,
        weight: Number(product.weight) || 0,

        sizes: product.sizes
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        colors: product.colors
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        tags: product.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        images: [],

        isfeatured: false,
        ispublised: true,
      };

      await api.post("/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully");

      setProduct({
        name: "",
        description: "",
        price: "",
        discountprice: "",
        countinstock: "",
        category: "",
        brand: "",
        collections: "",
        material: "",
        gender: "",
        sku: "",
        sizes: "",
        colors: "",
        tags: "",
        weight: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
      alert("Product Deleted");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Product Management
      </h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="discountprice"
          placeholder="Discount Price"
          value={product.discountprice}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="countinstock"
          placeholder="Stock"
          value={product.countinstock}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="collections"
          placeholder="Collection"
          value={product.collections}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={product.material}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="gender"
          value={product.gender}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={product.sku}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={product.weight}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="sizes"
          placeholder="S,M,L,XL"
          value={product.sizes}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="colors"
          placeholder="Black,White,Blue"
          value={product.colors}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="summer,new,casual"
          value={product.tags}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />
        <input
          type=""
          name="tags"
          placeholder="summer,new,casual"
          value={product.tags}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />

   
        <button
          type="submit"
          className="bg-black text-white py-2 rounded md:col-span-2"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Products ({products.length})
        </h2>

        <div className="grid gap-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <h3 className="text-xl font-bold">
                {item.name}
              </h3>

              <p>{item.description}</p>

              <div className="mt-2">
                <p>
                  <strong>Category:</strong>{" "}
                  {item.category}
                </p>

                <p>
                  <strong>Brand:</strong>{" "}
                  {item.brand}
                </p>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <p>
                  <strong>Stock:</strong>{" "}
                  {item.countinstock}
                </p>

                <p>
                  <strong>SKU:</strong> {item.sku}
                </p>

                <p>
                  <strong>Gender:</strong>{" "}
                  {item.gender}
                </p>

                <p>
                  <strong>Sizes:</strong>{" "}
                  {item.sizes?.join(", ")}
                </p>

                <p>
                  <strong>Colors:</strong>{" "}
                  {item.colors?.join(", ")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}