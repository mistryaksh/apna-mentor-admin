import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IChatProps } from "../../interface/chat.interface";

const CallApi = createApi({
     baseQuery: fetchBaseQuery(baseQuery),
     reducerPath: "callApi",
     endpoints: ({ query }) => ({
          GetAllCalls: query<{ data: IChatProps[] }, void>({
               query: () => `/website/calls`,
          }),
     }),
});

export const CallApiReducer = CallApi.reducer;
export const CallApiMiddleware = CallApi.middleware;
export const { useGetAllCallsQuery } = CallApi;
