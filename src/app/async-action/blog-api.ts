import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IBlogProps, INewBlogProps } from "../../interface";

const blogApi = createApi({
     reducerPath: "blogApi",
     baseQuery: fetchBaseQuery(baseQuery),
     tagTypes: ["blogs"],
     endpoints: ({ mutation, query }) => ({
          GetAllBlogs: query<{ data: IBlogProps[] }, void>({
               query: () => {
                    return {
                         url: "/blog",
                         method: "GET",
                    };
               },
               providesTags: ["blogs"],
          }),
          GetSpecificBlog: query({
               query: (id: string) => `/blog/${id}`,
               providesTags: ["blogs"],
          }),
          DeleteBlog: mutation({
               query: (id: string) => {
                    return {
                         url: `/blog/${id}`,
                         method: "DELETE",
                    };
               },
               invalidatesTags: ["blogs"],
          }),
          BlogActivationByAdmin: mutation({
               query: (id: string) => {
                    return {
                         url: `/blog/status/${id}`,
                         method: "PUT",
                    };
               },
               invalidatesTags: ["blogs"],
          }),
          CreateNewBlog: mutation({
               query: ({ active, body, image, label }: INewBlogProps) => {
                    return {
                         url: "/blog",
                         method: "POST",
                         body: { active, body, image, label },
                    };
               },
               invalidatesTags: ["blogs"],
          }),
          UpdateBlogStatus: mutation({
               query: (props: { id: string; blog: IBlogProps }) => {
                    return {
                         url: `/blog/update/${props.id}`,
                         method: "PUT",
                         body: { ...props.blog },
                    };
               },
               invalidatesTags: ["blogs"],
          }),
     }),
});

export const {
     useBlogActivationByAdminMutation,
     useCreateNewBlogMutation,
     useDeleteBlogMutation,
     useGetAllBlogsQuery,
     useGetSpecificBlogQuery,
     useUpdateBlogStatusMutation,
} = blogApi;

export const BlogReducer = blogApi.reducer;
export const BlogMiddleware = blogApi.middleware;
