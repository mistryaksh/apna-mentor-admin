import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IBuddyCoinsProps } from "../../interface";

const WalletApi = createApi({
  baseQuery: fetchBaseQuery(baseQuery),
  reducerPath: "walletApi",
  endpoints: (builder) => ({
    getWallet: builder.query<{ data: IBuddyCoinsProps[] }, void>({
      query: () => "/wallets",
    }),
  }),
});

export const WalletApiReducer = WalletApi.reducer;
export const WalletApiMiddleware = WalletApi.middleware;
export const { useGetWalletQuery } = WalletApi;
