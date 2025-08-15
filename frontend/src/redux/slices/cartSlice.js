import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load from localStorage
const loadFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Helper function to get the correct cart identifier
const getCartIdentifier = (userId, guestId) => {
  // Always prioritize userId if available (user is logged in)
  if (userId && userId !== 'undefined' && userId !== 'null') {
    return { userId };
  }
  if (guestId && guestId !== 'undefined' && guestId !== 'null') {
    return { guestId };
  }
  return {};
};

// Helper function for cart operations (kept for future debugging if needed)
const logCartOperation = (operation, params) => {
  // Empty function - can be used for future debugging
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue, getState }) => {
    try {
      // Get current state to ensure we have the latest identifiers
      const state = getState();
      const currentUserId = state.auth.user?._id;
      const currentGuestId = state.auth.guestId;
      
      // Use current state identifiers if not provided
      const finalUserId = userId || currentUserId;
      const finalGuestId = guestId || currentGuestId;
      
      const params = getCartIdentifier(finalUserId, finalGuestId);
      logCartOperation("fetch", params);
      
      // If we still don't have an identifier, this is a critical error
      if (!params.userId && !params.guestId) {
        return rejectWithValue({ message: "No valid user or guest identifier found" });
      }
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { params }
      );
      return response.data;
    } catch (err) {
      // If it's a 404 (cart not found), return an empty cart instead of error
      if (err.response?.status === 404) {
        return { products: [], totalPrice: 0 };
      }
      
      return rejectWithValue(err.response?.data || { message: "Failed to fetch cart" });
    }
  }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue, getState }
  ) => {
    try {
      // Get current state to ensure we have the latest identifiers
      const state = getState();
      const currentUserId = state.auth.user?._id;
      const currentGuestId = state.auth.guestId;
      
      // Use current state identifiers if not provided
      const finalUserId = userId || currentUserId;
      const finalGuestId = guestId || currentGuestId;
      
      const payload = { productId, quantity, size, color, ...getCartIdentifier(finalUserId, finalGuestId) };
      logCartOperation("add", payload);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to add to cart" });
    }
  }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, guestId, userId, size, color },
    { rejectWithValue, getState }
  ) => {
    try {
      // Get current state to ensure we have the latest identifiers
      const state = getState();
      const currentUserId = state.auth.user?._id;
      const currentGuestId = state.auth.guestId;
      
      // Use current state identifiers if not provided
      const finalUserId = userId || currentUserId;
      const finalGuestId = guestId || currentGuestId;
      
      const payload = { productId, quantity, size, color, ...getCartIdentifier(finalUserId, finalGuestId) };
      logCartOperation("update", payload);
      
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to update item quantity" });
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue, getState }) => {
    try {
      // Get current state to ensure we have the latest identifiers
      const state = getState();
      const currentUserId = state.auth.user?._id;
      const currentGuestId = state.auth.guestId;
      
      // Use current state identifiers if not provided
      const finalUserId = userId || currentUserId;
      const finalGuestId = guestId || currentGuestId;
      
      const payload = { productId, size, color, ...getCartIdentifier(finalUserId, finalGuestId) };
      logCartOperation("remove", payload);
      
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: payload,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to remove item from cart" });
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
        }
      );
      
      // Return the merged cart directly instead of fetching again
      // This avoids the 404 error that can happen during the fetch
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to merge cart" });
    }
  }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        cleanCart: (state) => {
            state.cart = {products: []};
            localStorage.removeItem("cart");
        },
        refreshCartAfterMerge: (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            state.error = null;
            saveCartToStorage(action.payload);
        },
        resetCartState: (state) => {
            state.cart = { products: [] };
            state.loading = false;
            state.error = null;
            localStorage.removeItem("cart");
        },
        forceRefreshCart: (state, action) => {
            // Force refresh cart state with new data
            state.cart = action.payload;
            state.loading = false;
            state.error = null;
            saveCartToStorage(action.payload);
        },
        cleanupCartState: (state) => {
            // Clean up cart state and ensure consistency
            if (!state.cart || !state.cart.products) {
                state.cart = { products: [], totalPrice: 0 };
                saveCartToStorage(state.cart);
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        // Add an item to the cart
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        })
        // Update the quantity of an item in the cart
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity";
        })
        // Remove an item from the cart
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item from cart";
        })
        // Merge guest cart into user cart
        .addCase(mergeCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCart.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                // Ensure the merged cart is properly formatted for the frontend
                const mergedCart = {
                    ...action.payload,
                    // Ensure we have the correct structure
                    products: action.payload.products || [],
                    totalPrice: action.payload.totalPrice || 0
                };
                
                // Update cart state with merged cart
                state.cart = mergedCart;
                
                // Save to localStorage
                saveCartToStorage(mergedCart);
            }
        })
        .addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
        });
    },
});

export const { cleanCart, refreshCartAfterMerge, resetCartState, forceRefreshCart, cleanupCartState } = cartSlice.actions;
export default cartSlice.reducer;