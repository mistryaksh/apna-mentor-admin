import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { UserProps } from "../../interface";

const usersApi = createApi({
     reducerPath: "userApi",
     baseQuery: fetchBaseQuery(baseQuery),
     tagTypes: ["users"],
     endpoints: (builder) => ({
          UpdateUserBlockStatus: builder.mutation({
               query: (id: string) => {
                    return {
                         url: `/user/block/${id}`,
                         method: "PUT",
                    };
               },
               invalidatesTags: ["users"],
          }),
          GetAllUsers: builder.query<{ data: UserProps[] }, void>({
               query: () => "/get-all-users",
               providesTags: ["users"],
          }),
     }),
});

export const { useGetAllUsersQuery, useUpdateUserBlockStatusMutation } = usersApi;

export const UsersReducer = usersApi.reducer;
export const UserMiddleware = usersApi.middleware;
