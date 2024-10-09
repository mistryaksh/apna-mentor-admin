import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { ICategoryProps } from "../../interface";

const CategoryApi = createApi({
  baseQuery: fetchBaseQuery(baseQuery),
  reducerPath: "categoryApi",
  tagTypes: ["categoryApi"],
  endpoints: ({ query, mutation }) => ({
    getAllCategory: query<{ data: ICategoryProps[] }, void>({
      query: () => `/category`,
      providesTags: ["categoryApi"],
    }),
    getCategoryById: query<{ data: ICategoryProps }, string>({
      query: (id) => `/category/${id}`,
      providesTags: ["categoryApi"],
    }),
    CreateNewCategory: mutation<{ data: string }, ICategoryProps>({
      query: (payload) => {
        return {
          url: "/category",
          body: {
            ...payload,
          },
          method: "POST",
        };
      },
      invalidatesTags: ["categoryApi"],
    }),
    DeleteCategoryById: mutation<{ data: string }, string>({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const {
  useLazyGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useLazyGetCategoryByIdQuery,
  useGetAllCategoryQuery,
  useCreateNewCategoryMutation,
  useDeleteCategoryByIdMutation,
} = CategoryApi;
