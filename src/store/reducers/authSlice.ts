import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: localStorage.getItem("AccessToken") || "",
  refreshToken: localStorage.getItem("RefreshToken") || "",
  isAuthenticated: !!localStorage.getItem("AccessToken"),
  loading: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },

    // Set user tokens (used for both login and registration)
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string , user: any}>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      console.log("action.payload.accessToken", action.payload.accessToken);
      

      // Store tokens in localStorage
      localStorage.setItem("AccessToken", action.payload.accessToken);
      localStorage.setItem("RefreshToken", action.payload.refreshToken);
      localStorage.setItem("User", JSON.stringify(action.payload.user)); // Save user as JSON in localStorage
      document.cookie = `AccessToken=${action.payload.accessToken}; path=/; secure; SameSite=Strict`;
    },

    // Reset user tokens on logout
    resetTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.error = null;

      // Remove tokens from localStorage
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("User");
      document.cookie = "AccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    },

    // Handle error state
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Check login status
    checkLoginStatus: (state) => {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        state.isAuthenticated = true;
        state.accessToken = token;
      } else {
        state.isAuthenticated = false;
        state.accessToken = "";
        state.refreshToken = "";
      }
    },
  },
});

export const { setLoading, setTokens, resetTokens, setError, checkLoginStatus } = authSlice.actions;

export default authSlice.reducer;
