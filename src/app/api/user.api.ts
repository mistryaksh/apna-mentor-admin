import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IUserProps } from "../../interface/user.interface";

const UserApi = createApi({
     baseQuery: fetchBaseQuery(baseQuery),
     reducerPath: "userApi",
     endpoints: ({ query }) => ({
          GetAllUser: query<{ data: IUserProps[] }, void>({
               query: () => `/website/users`,
          }),
          GetUserById: query<{ data: IUserProps }, string>({
               query: (id: string) => `/website/users/${id}`,
          }),
     }),
});

export const UserApiReducer = UserApi.reducer;
export const UserApiMiddleware = UserApi.middleware;
export const { useGetAllUserQuery, useLazyGetUserByIdQuery } = UserApi;
