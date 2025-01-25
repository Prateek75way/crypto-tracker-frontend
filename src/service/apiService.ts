import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store"; // Import RootState as a type
import { setTokens, resetTokens } from "../store/reducers/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";

// Base query with re-authentication handler
export const baseQueryWithReauthHandler = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken; // Properly typed getState
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Token expired, refresh it
    const refreshResult = await baseQuery(
      {
        url: "/users/refresh",
        method: "POST",
        body: { refreshToken: localStorage.getItem("RefreshToken") },
      },
      api,
      extraOptions
    );
    console.log(refreshResult);
    
    if (refreshResult.data) {
      
      const accessToken = refreshResult.data.data.accessToken;
      const refreshToken = refreshResult.data.data.refreshToken;
      const user = refreshResult.data.data.user;
      

      // Save the new tokens
      api.dispatch(setTokens({ accessToken, refreshToken, user }));
      localStorage.setItem("AccessToken", accessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      localStorage.setItem("User", JSON.stringify(user));

      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, reset tokens
      api.dispatch(resetTokens());
    }
  }

  return result;
};

// Define the base URL for your API
const BASE_URL = "http://localhost:8000/api";

interface PortfolioItem {
  symbol: string;
  amount: number;
  currentPrice: number;
  totalValue: number;
}

// Create the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauthHandler, // Use the reauth handler as the base query
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (data: { name: string; email: string; password: string }) => ({
        url: "/users/",
        method: "POST",
        body: data,
      }),
    }),

    checkLoginStatus: builder.query({
      queryFn: () => {
        const token = localStorage.getItem("AccessToken");
        const user = localStorage.getItem("User ");

        if (!token || !user) {
          return { error: { status: 401, data: "Not authenticated" } };
        }

        return { data: JSON.parse(user) };
      },
    }),
    
    getPortfolio: builder.query<{ data: { portfolio: PortfolioItem[] } }, void>({
      query: () => "/users/portfolio",
    }),
    
    createTransaction: builder.mutation({
      query: (transactionData: { symbol: string; type: string; amount: number }) => ({
        url: "/crypto/transactions",
        method: "POST",
        body: transactionData,
      }),
    }),
    
    transferCrypto: builder.mutation({
      query: (data: { senderId: string; receiverId: string; symbol: string; amount: number }) => ({
        url: "/crypto/transfer",
        method: "POST",
        body: data,
      }),
    }),
    
    getPnL: builder.query({
      query: () => "crypto/portfolio/pnl",  // This is the backend route that gets the PnL data
    }),

    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: "users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    fetchPrices: builder.query({
      query: ({ symbols }) => ({
        url: `/crypto/prices`,
        method: "GET",
        params: {
          symbols: symbols.join(','), // Convert the array to a comma-separated string
          
        },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: "/users/reset-password",
        method: "POST",
        body: { token, newPassword },
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "POST",
        body: { refreshToken: localStorage.getItem("RefreshToken") },
      }),
    }),
  }),
});

// Export hooks for login and status check
export const { 
  useLoginMutation, 
  useCheckLoginStatusQuery, 
  useRegisterMutation, 
  useGetPortfolioQuery,
  useCreateTransactionMutation, 
  useTransferCryptoMutation,
  useGetPnLQuery, 
  useForgotPasswordMutation,  
  useFetchPricesQuery, 
  useResetPasswordMutation, 
  useRefreshTokenMutation 
} = authApi;