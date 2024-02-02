import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { ICategoryProps } from "../../interface";

const CategoryApi = createApi({
     baseQuery: fetchBaseQuery(baseQuery),
     reducerPath: "categoryApi",
     tagTypes: ["categoryApi"],
     endpoints: ({ query }) => ({
          getAllCategory: query<{ data: ICategoryProps[] }, void>({
               query: () => `/category`,
               providesTags: ["categoryApi"],
          }),
          getCategoryById: query<{ data: ICategoryProps }, string>({
               query: (id) => `/category/${id}`,
               providesTags: ["categoryApi"],
          }),
     }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const { useGetAllCategoryQuery, useGetCategoryByIdQuery, useLazyGetCategoryByIdQuery } = CategoryApi;
