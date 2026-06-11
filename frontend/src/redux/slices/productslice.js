import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

// Fetch products by filters
export const fetchproductbyfilters = createAsyncThunk(
  "products/fetchbyfilters",
  async ({
    collection,
    size,
    color,
    gender,
    minprice,
    maxprice,
    sortby,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minprice) query.append("minprice", minprice);
    if (maxprice) query.append("maxprice", maxprice);
    if (sortby) query.append("sortby", sortby);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );

    return response.data;
  }
);

// Fetch single product
export const fetchproductdetails = createAsyncThunk(
  "products/fetchproductsdetail",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );

    return response.data;
  }
);

// Fetch best sellers
export const fetchBestSellers = createAsyncThunk(
  "products/fetchBestSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
       // `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        "http://localhost:5000/api/products/best-seller"
      );
      console.log("Best Sellers Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch best sellers",
        }
      );
    }
  }
);

// Update product
export const updateproduct = createAsyncThunk(
  "products/updateproduct",
  async ({ id, productdata }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return response.data;
  }
);

// Similar products
export const fetchsimilarproducts = createAsyncThunk(
  "products/fetchsimilarproducts",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );

    return response.data;
  }
);

const productslice = createSlice({
  name: "product",

  initialState: {
    products: [],
    bestSellers: [],
    selectedproduct: null,
    similarproducts: [],

    loading: false,
    status: "idle",
    error: null,

    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minprice: "",
      maxprice: "",
      sortby: "",
      search: "",
      material: "",
      collection: "",
    },
  },

  reducers: {
    setfilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearfilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minprice: "",
        maxprice: "",
        sortby: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder

      // Products by filters
      .addCase(fetchproductbyfilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductbyfilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchproductbyfilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Product details
      .addCase(fetchproductdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedproduct = action.payload;
      })
      .addCase(fetchproductdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Best Sellers
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bestSellers = action.payload;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || action.error.message;
      })

      // Update Product
      .addCase(updateproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.loading = false;

        const updatedproduct = action.payload;

        const index = state.products.findIndex(
          (product) => product._id === updatedproduct._id
        );

        if (index !== -1) {
          state.products[index] = updatedproduct;
        }
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Similar Products
      .addCase(fetchsimilarproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchsimilarproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarproducts = action.payload;
      })
      .addCase(fetchsimilarproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { setfilters, clearfilters } = productslice.actions;

export default productslice.reducer;