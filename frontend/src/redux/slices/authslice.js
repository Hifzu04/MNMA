import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
const userfromstorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Generate or get guest ID
const initialguestid =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialguestid);

const initialState = {
  user: userfromstorage,
  guestId: initialguestid,
  loading: false,
  error: null,
};

// LOGIN USER
export const loginuser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// REGISTER USER
export const registeruser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

const authslice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;

      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },

    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // REGISTER
      .addCase(registeruser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registeruser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registeruser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId } = authslice.actions;

export default authslice.reducer;