import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IBlogsProps } from "../../interface";

const BlogApi = createApi({
    baseQuery: fetchBaseQuery(baseQuery),
    reducerPath: "blogApi",
    endpoints: ({ mutation, query }) => ({
        GetAllBlogs: query<{ data: IBlogsProps[] }, void>({
            query: () => `/blog`,
        }),
        CreateNewBlog: mutation<{ data: string }, IBlogsProps>({
            query: (payload) => {
                return {
                        url: "/blog",
                        body: {
                            ...payload,
                        },
                        method: "POST",
                };
            },
        }),
        DeleteBlogById: mutation<{ data: string }, string>({
            query: (id) => {
                return {
                    url: `/blog/${id}`,
                    method: "DELETE",
                };
        },
    }),
    }),
});

export const BlogApiReducer = BlogApi.reducer;
export const BlogApiMiddleware = BlogApi.middleware;
export const { useGetAllBlogsQuery, useCreateNewBlogMutation, useDeleteBlogByIdMutation } = BlogApi;
