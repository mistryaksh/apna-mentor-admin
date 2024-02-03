import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useGetAllBlogsQuery, useDeleteBlogByIdMutation } from "../../../../app/api";
import { AppButton, PageTitle } from "../../../../component";
import { AiOutlineLoading, AiOutlineDelete } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ManageBlogPage = () => {
     const {
          data: blogs,
          isError: isBlogError,
          error: blogError,
          isLoading: isBlogLoading,
     } = useGetAllBlogsQuery();
     
     const [
          DeleteBlogById, 
          { 
               isError: isDeleteBlogError,
               error: deleteBlogError,
               isLoading: isDeleteBlogLoading,
               data: deleteBlogData,
               isSuccess: isDeleteBlogSuccess,
          }
     ] = useDeleteBlogByIdMutation();

     const navigate = useNavigate();

     useEffect(() => {
          if (isBlogError) {
               console.log(blogError);
          }
          if (isDeleteBlogError) {
               console.log(deleteBlogError);
          }
          if (isDeleteBlogSuccess) {
               toast.success("Blog deleted successfully", deleteBlogData);
          }
     }, [isBlogError, blogError, navigate, blogs?.data, isDeleteBlogError, deleteBlogError, isDeleteBlogLoading, deleteBlogData, isDeleteBlogSuccess]);

     const DeleteAction = (id: string) => {
          DeleteBlogById(id);
     }

     return (
          <Layout pageTitle="Manage Category">
               <div>
                    <PageTitle
                         title={`Manage Blogs`}
                         subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, distinctio."
                    />
               </div>
               <div className="flex justify-end items-center mb-8">
                    <AppButton primary onClick={() => navigate('/blogs/manage/new')}>
                         Add new
                    </AppButton>
               </div>
               {isBlogLoading && !isDeleteBlogLoading && (
                    <div className="flex justify-center flex-col items-center gap-4">
                         <AiOutlineLoading size={150} className="animate-spin text-primary-500" />
                         <p className="text-gray-500 font-mono">Mentors are loading....</p>
                    </div>
               )}
               {!isBlogLoading && !isDeleteBlogLoading && blogs?.data.length !== 0 ? (
                    <DataTable
                         pagination
                         paginationPerPage={20}
                         noDataComponent={
                              <div>
                                   <h6>There are no blog to show</h6>
                                   <AppButton primary>New blog</AppButton>
                              </div>
                         }
                         progressComponent={
                              <div className="">
                                   <AiOutlineLoading size={150} />
                                   <p>Blogs are loading....</p>
                              </div>
                         }
                         data={blogs?.data || []}
                         columns={[
                              {
                                   id: "#",
                                   name: "#",
                                   width: "80px",

                                   cell: (_, i) => (
                                        <div>
                                             <p className="text-md">{i + 1}</p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Label",
                                   width: "220px",

                                   cell: ({ label }) => (
                                        <div className="py-5">
                                        <p className="text-md capitalize text-lg">
                                             {label}
                                        </p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "SubLabel",
                                   width: "380px",

                                   cell: ({ subLabel }) => (
                                        <div className="py-5">
                                        <p className="text-md capitalize text-lg">
                                             {subLabel}
                                        </p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Comments",
                                   width: "140px",

                                   cell: ({ comment }) => (
                                        <div className="py-5">
                                             <p className="text-md capitalize text-lg">
                                                  {comment.length}
                                             </p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Actions",
                                   cell: ({ _id }) => (
                                        <div className="flex gap-5 items-center">
                                             {/* <AppButton primary onClick={() => navigate(`/mentors/${_id}`)}>
                                                  <AiOutlineEdit size={25} className="text-white" />
                                             </AppButton> */}
                                             <AppButton danger onClick={() => DeleteAction(_id as string)}>
                                                  <AiOutlineDelete size={25} className="text-white" />
                                             </AppButton>
                                        </div>
                                   ),
                              },
                         ]}
                    />
               ) : <p className="text-gray-500 text-lg text-center font-medium bg-gray-100 shadow-sm rounded-md py-6">No more data available!</p>}
          </Layout>
     );
};


