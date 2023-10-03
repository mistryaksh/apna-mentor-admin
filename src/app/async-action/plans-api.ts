import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { PaymentOptionProps } from "../../interface";

const planOptionApi = createApi({
     reducerPath: "planOptionApi",
     baseQuery: fetchBaseQuery(baseQuery),
     tagTypes: ["plans"],
     endpoints: (builder) => ({
          GetAllPlanOption: builder.query<{ data: PaymentOptionProps[] }, void>({
               query: () => `/plan-option`,
               providesTags: ["plans"],
          }),
          GetPlanOptionById: builder.query({
               query: (id: string) => `/plan-option/${id}`,
          }),
          CreatePlanOption: builder.mutation({
               invalidatesTags: ["plans"],
               query: ({ active, includes, planName, price, validFor, offer }: PaymentOptionProps) => {
                    return {
                         url: "/plan-option",
                         method: "POST",
                         body: {
                              active,
                              includes,
                              planName,
                              price,
                              validFor,
                              offer,
                         },
                    };
               },
          }),
          TogglePlanOptionStatus: builder.mutation({
               invalidatesTags: ["plans"],
               query: (planId: string) => {
                    return {
                         url: `/plan-option/${planId}`,
                         method: "PUT",
                    };
               },
          }),
          RemovePlanOption: builder.mutation({
               invalidatesTags: ["plans"],
               query: (planId: string) => {
                    return {
                         url: `/plan-option/${planId}`,
                         method: "DELETE",
                    };
               },
          }),
     }),
});

export const {
     useGetAllPlanOptionQuery,
     useCreatePlanOptionMutation,
     useGetPlanOptionByIdQuery,
     useRemovePlanOptionMutation,
     useTogglePlanOptionStatusMutation,
} = planOptionApi;

export const PlanOptionReducer = planOptionApi.reducer;
export const PlanOptionMiddleware = planOptionApi.middleware;
