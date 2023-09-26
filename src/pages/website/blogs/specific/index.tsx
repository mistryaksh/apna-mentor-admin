import React from "react";
import { Layout } from "../../../../layout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetSpecificBlogQuery } from "../../../../app/async-action";
import { IoArrowBack } from "react-icons/io5";
import moment from "moment";

export const SpecificBlogPage = () => {
     const params = useParams();
     const { data } = useGetSpecificBlogQuery(params.id as string);
     const navigate = useNavigate();

     if (!params.id) {
          return <Navigate to="/blogs/manage" replace />;
     } else {
          return (
               <Layout pageTitle="Specific Blog">
                    <div className="py-10">
                         <div className="">
                              <button
                                   onClick={() => navigate("/blogs/manage", { replace: true })}
                                   type="submit"
                                   className="flex gap-3"
                              >
                                   <IoArrowBack size={26} />
                                   <p className="capitalize text-lg">back</p>
                              </button>
                         </div>
                    </div>
                    <div className="xl:w-[70%] mx-auto mb-20">
                         <img src={data?.data.image} alt={data?.data.label} />
                         <h6 className="text-3xl font-poppins my-10">{data?.data.label}</h6>
                         <p className="text-gray-500 capitalize">
                              {moment(data?.data.createdAt).format("MMMM Do YYYY")} | Uploaded By{" "}
                              {data?.data?.adminId?.name?.firstName} {data?.data?.adminId?.name?.lastName}
                         </p>
                         <p dangerouslySetInnerHTML={{ __html: data?.data.body }} className="whitespace-pre-wrap" />
                    </div>
               </Layout>
          );
     }
};
