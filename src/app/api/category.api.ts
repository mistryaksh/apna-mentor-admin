import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { ICategoryProps, ISubCategoryProps } from "../../interface";

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
          }),
          DeleteCategoryById: mutation<{ data: string }, string>({
               query: (id) => {
                    return {
                         url: `/category/${id}`,
                         method: "DELETE",
                    };
               },
          }),
          getAllSubCategory: query<{ data: ISubCategoryProps[] }, void>({
               query: () => `/sub-category`,
               providesTags: ["categoryApi"],
          }),
          getSubCategoryById: query<{ data: ISubCategoryProps }, string>({
               query: (id) => `/sub-category/${id}`,
               providesTags: ["categoryApi"],
          }),
          CreateNewSubCategory: mutation<{ data: string }, ISubCategoryProps>({
               query: (payload) => {
                    return {
                         url: "/sub-category",
                         body: {
                              ...payload,
                         },
                         method: "POST",
                    };
               },
          }),
          DeleteSubCategoryById: mutation<{ data: string }, string>({
               query: (subCategoryId) => {
                    return {
                         url: `/sub-category/${subCategoryId}`,                         
                         method: "DELETE",
                    };
               },
          }),
     }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const { useLazyGetAllCategoryQuery, useGetCategoryByIdQuery, useLazyGetCategoryByIdQuery, useCreateNewCategoryMutation, useDeleteCategoryByIdMutation, useGetAllSubCategoryQuery, useGetSubCategoryByIdQuery, useCreateNewSubCategoryMutation, useDeleteSubCategoryByIdMutation } = CategoryApi;
