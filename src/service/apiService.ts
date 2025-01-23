import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

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
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("AccessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
   },
    
  ),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (data: { name: string, email: string, password: string, }) => ({
        url: "/users/",
        method: "POST",
        body: data,
      }),
    }),

    checkLoginStatus: builder.query({
      queryFn: () => {
        const token = localStorage.getItem("AccessToken");
        const user = localStorage.getItem("User");

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
      // Transfer Crypto
    transferCrypto: builder.mutation({
      query: (data: { senderId: string; receiverId: string; symbol: string; amount: number }) => ({
        url: "/crypto/transfer",
        method: "POST",
        body: data,
     
    })
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
      query: ({ symbols, currency }) => ({
        url: `/crypto/prices`,
        method: "GET",
        params: {
          symbols: symbols.join(','), // Convert the array to a comma-separated string
          currency,
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
  
  }),
});



// Export hooks for login and status check
export const { useLoginMutation, useCheckLoginStatusQuery, useRegisterMutation, useGetPortfolioQuery,useCreateTransactionMutation, useTransferCryptoMutation,useGetPnLQuery, useForgotPasswordMutation,  useFetchPricesQuery, useResetPasswordMutation} = authApi;
