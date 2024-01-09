import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IMentorProps } from "../../interface";

const MentorApi = createApi({
     baseQuery: fetchBaseQuery(baseQuery),
     reducerPath: "mentorApi",
     endpoints: ({ mutation, query }) => ({
          GetAllMentor: query<{ data: IMentorProps[] }, void>({
               query: () => `/mentor`,
          }),
          GetMentorById: query<{ data: IMentorProps }, string>({
               query: (id: string) => `/mentor/profile/${id}`,
          }),
     }),
});

export const MentorApiReducer = MentorApi.reducer;
export const MentorApiMiddleware = MentorApi.middleware;
export const { useGetAllMentorQuery, useLazyGetMentorByIdQuery } = MentorApi;
