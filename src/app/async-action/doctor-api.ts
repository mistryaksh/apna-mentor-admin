import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils";
import { IDoctorProps, IRatedDoctorProps } from "../../interface";

const doctorApi = createApi({
     reducerPath: "doctorApi",
     baseQuery: fetchBaseQuery(baseQuery),
     tagTypes: ["doctors", "top_doctors"],
     endpoints: (build) => ({
          GetAllDoctor: build.query<{ data: IDoctorProps[] }, void>({
               query: () => `/doctor/get`,
               providesTags: ["doctors"],
          }),
          GetSpecificDoctor: build.query({
               query: (id: string) => `/doctor/${id}`,
          }),
          GetStatusWiseDoctors: build.query({
               query: (status) => `/doctor/status/${status}`,
          }),
          CreateDoctorProfile: build.mutation({
               query: ({ authDetails, contact, name, role, workDetails }: IDoctorProps) => {
                    return {
                         url: "/doctor/add-new",
                         body: {
                              authDetails,
                              contact,
                              name,
                              role,
                              workDetails,
                         },
                         method: "POST",
                    };
               },
               invalidatesTags: ["doctors"],
          }),
          DeleteDoctorById: build.mutation({
               query: (id: string) => {
                    return {
                         url: `/doctor/delete/${id}`,
                         method: "DELETE",
                    };
               },
               invalidatesTags: ["doctors"],
          }),
          BlockUnblockDoctorProfile: build.mutation({
               query: (id: string) => {
                    return {
                         url: `/doctor/block/${id}`,
                         method: "PUT",
                    };
               },
               invalidatesTags: ["doctors"],
          }),
          UploadTopDoctor: build.mutation({
               query: (props: string) => {
                    return {
                         url: `/upload-top-doctor`,
                         method: "POST",
                         body: {
                              doctorId: props,
                         },
                    };
               },
               invalidatesTags: ["top_doctors"],
          }),
          GetAllTopDoctor: build.query<{ data: IRatedDoctorProps[] }, void>({
               query: () => `/list-top-doctor`,
               providesTags: ["top_doctors"],
          }),
          RemoveTopDoctor: build.mutation({
               query: (props) => {
                    return {
                         url: `/delete-top-doctor/${props}`,
                         method: "DELETE",
                    };
               },
               invalidatesTags: ["top_doctors"],
          }),
     }),
});

export const {
     useBlockUnblockDoctorProfileMutation,
     useCreateDoctorProfileMutation,
     useDeleteDoctorByIdMutation,
     useGetAllDoctorQuery,
     useGetSpecificDoctorQuery,
     useGetStatusWiseDoctorsQuery,
     useRemoveTopDoctorMutation,
     useUploadTopDoctorMutation,
     useGetAllTopDoctorQuery,
} = doctorApi;

export const DoctorReducer = doctorApi.reducer;
export const DoctorMiddleware = doctorApi.middleware;
