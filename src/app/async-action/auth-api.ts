import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";

const authApi = createApi({
     reducerPath: "authApi",
     baseQuery: fetchBaseQuery(baseQuery),
     endpoints: (builder) => ({
          LoginAdmin: builder.mutation({
               query: (body: { mobile: string; password: string }) => {
                    return {
                         url: "/admin/sign-in",
                         method: "PUT",
                         body,
                    };
               },
          }),
          ProfileAdmin: builder.query<any, void>({
               query: () => "/admin/profile",
          }),
          LogoutAdmin: builder.mutation({
               query: (_) => {
                    return {
                         url: "/admin/sign-out",
                         method: "PUT",
                         body: {},
                    };
               },
          }),
     }),
});

export const { useLoginAdminMutation, useLogoutAdminMutation, useProfileAdminQuery } = authApi;

export const AuthenticationReducer = authApi.reducer;
export const AuthenticationMiddleware = authApi.middleware;
