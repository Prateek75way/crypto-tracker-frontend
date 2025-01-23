import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"; // Your existing auth slice reducer
import { authApi } from "../service/apiService"; // RTK Query API service

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the authSlice here
    [authApi.reducerPath]: authApi.reducer, // Add the RTK Query API reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add the RTK Query middleware here
});

export default store;
