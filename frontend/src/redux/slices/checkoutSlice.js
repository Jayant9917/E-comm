import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk("checkout/createCheckout", async(checkoutdata, 
    {rejectWithValue}) => {
        try {
            // Prepare headers - only add Authorization if user is logged in
            const headers = {};
            const userToken = localStorage.getItem("userToken");
            
            if (userToken) {
                headers.Authorization = `Bearer ${userToken}`;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, 
                checkoutdata,
                { headers }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Failed to create checkout" });
        }
    });

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCheckout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkout = action.payload;
        })
        .addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export default checkoutSlice.reducer;