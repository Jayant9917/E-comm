import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user Info and token from local storage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Ensure userFromStorage has _id property for frontend compatibility
const mappedUserFromStorage = userFromStorage ? {
  ...userFromStorage,
  _id: userFromStorage._id || userFromStorage.id // Use _id if exists, fallback to id
} : null;

// Check for an existing guest ID in the local storage or generate a new One
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initail State
const initialState = {
  user: mappedUserFromStorage,
  guestId: initialGuestId,
  isLoading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      
      // Map backend 'id' to frontend '_id' for localStorage consistency
      const mappedUser = {
        ...response.data.user,
        _id: response.data.user.id
      };
      
      localStorage.setItem("userInfo", JSON.stringify(mappedUser));
      localStorage.setItem("userToken", response.data.token);

      return mappedUser; // Return the mapped user object
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      
      // Map backend 'id' to frontend '_id' for localStorage consistency
      const mappedUser = {
        ...response.data.user,
        _id: response.data.user.id
      };
      
      localStorage.setItem("userInfo", JSON.stringify(mappedUser));
      localStorage.setItem("userToken", response.data.token);

      return mappedUser; // Return the mapped user object
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Registration failed" });
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on Logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
      // Clear cart from localStorage on logout
      localStorage.removeItem("cart");
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    clearGuestId: (state) => {
      state.guestId = null;
      localStorage.removeItem("guestId");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      // Ensure the user object has the required properties
      if (action.payload && typeof action.payload === 'object') {
        // Make sure we have a valid user object with id (backend sends 'id', not '_id')
        if (!action.payload.id) {
          // User object missing id property - handle gracefully
        }
        
        // Map backend 'id' to frontend '_id' for consistency
        const mappedUser = {
          ...action.payload,
          _id: action.payload.id // Add _id property for frontend compatibility
        };
        
        state.user = mappedUser;
      } else {
        // Invalid user payload received - handle gracefully
        state.user = null;
      }
      
      state.isLoading = false;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    })
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      // Ensure the user object has the required properties
      if (action.payload && typeof action.payload === 'object') {
        // Make sure we have a valid user object with id (backend sends 'id', not '_id')
        if (!action.payload.id) {
          // User object missing id property - handle gracefully
        }
        
        // Map backend 'id' to frontend '_id' for consistency
        const mappedUser = {
          ...action.payload,
          _id: action.payload.id // Add _id property for frontend compatibility
        };
        state.user = mappedUser;
      } else {
        // Invalid user payload received - handle gracefully
        state.user = null;
      }
      
      state.isLoading = false;
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { logout, generateNewGuestId, clearGuestId } = authSlice.actions;
export default authSlice.reducer;
