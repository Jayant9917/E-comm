import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  }
);

// Async function to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/admin/products`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    await axios.delete(
      `${API_URL}/api/admin/products/${id}`,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return id;
  }
);

// Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk(
  "adminProducts/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create a new product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.product);
      })
      // Update an existing product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.product || action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        // Also update selectedProduct if it's the same product being edited
        if (state.selectedProduct && state.selectedProduct._id === updatedProduct._id) {
          state.selectedProduct = updatedProduct;
        }
      })
      // Delete a product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminProductSlice.reducer;