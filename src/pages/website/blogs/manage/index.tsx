import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { AppButton, AppInput } from "../../../../component";
import {
     useBlogActivationByAdminMutation,
     useDeleteBlogMutation,
     useGetAllBlogsQuery,
} from "../../../../app/async-action";
import moment from "moment";
import {
     AiOutlineArrowRight,
     AiOutlineDelete,
     AiOutlineEye,
     AiOutlineEyeInvisible,
     AiOutlineLoading,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

export const ManageBlogPage = () => {
     const { data: blogData, isLoading: isBlogLoading, isError: isBlogError, error: blogError } = useGetAllBlogsQuery();
     const [DeleteBlog, { isError: isDeleteError, error: deleteError, isLoading: isDeleteLoading }] =
          useDeleteBlogMutation();
     const [
          ActivationOfBlog,
          {
               data: activationData,
               isError: isActivationError,
               isLoading: isActivationLoading,
               isSuccess: isActivationSuccess,
               error: activationError,
          },
     ] = useBlogActivationByAdminMutation();
     const navigate = useNavigate();

     useEffect(() => {
          if (isBlogError) {
               if ((blogError as any).data) {
                    toast.error((blogError as any).data.message);
               } else {
                    toast.error((blogError as any).message);
               }
          }
          if (isDeleteError) {
               if ((deleteError as any).data) {
                    toast.error((deleteError as any).data.message);
               } else {
                    toast.error((deleteError as any).message);
               }
          }
          if (isActivationError) {
               if ((activationError as any).data) {
                    console.log(activationError);
                    toast.error((activationError as any).data.message);
               } else {
                    toast.error((activationError as any).message);
               }
          }
          if (isActivationSuccess) {
               toast.success(activationData.data);
          }
     }, [
          isBlogError,
          blogError,
          deleteError,
          isDeleteError,
          activationError,
          isActivationError,
          isActivationSuccess,
          activationData,
     ]);

     const DeletingBlog = async (id: string) => {
          await DeleteBlog(id);
     };
     const ActivationBlog = async (id: string) => {
          await ActivationOfBlog(id);
     };

     return (
          <Layout pageTitle="Manage Blogs">
               <div className="flex justify-between mt-20 items-center">
                    <h6 className="text-xl font-semibold">Manage Blogs</h6>
                    <div className="flex gap-3 items-center">
                         <AppInput
                              type="search"
                              className="w-[400px] py-2 border focus:border-primary-500 focus:outline-none px-5 rounded-lg"
                              placeholder="Search blog name"
                         />
                         <AppButton primary>Search</AppButton>
                         <AppButton onClick={() => navigate("/blogs/new")} primary>
                              Upload new blog
                         </AppButton>
                    </div>
               </div>

               <div className="grid grid-cols-12 my-20 gap-10">
                    {!isBlogLoading &&
                         !isDeleteLoading &&
                         !isActivationLoading &&
                         blogData?.data.map(({ label, image, createdAt, _id, adminId, active }) => (
                              <div
                                   key={_id}
                                   className="col-span-12 xl:col-span-4 rounded-b-lg hover:shadow-lg lg:col-span-4 md:col-span-6 sm:col-span-12 font-poppins"
                              >
                                   <img src={image} alt={label} className="w-full" />
                                   <div className="px-3 py-2">
                                        <Link to={`/blogs/manage/${_id}`}>
                                             <label htmlFor={label} className="line-clamp-1 text-xl capitalize">
                                                  {label}
                                             </label>
                                        </Link>
                                        <p className="capitalize my-2">
                                             <span className="text-gray-400 font-semibold font-poppins line-clamp-1">
                                                  {adminId?.name.firstName} {adminId?.name.lastName} |
                                             </span>{" "}
                                             <span className="text-gray-900">
                                                  {moment(createdAt).format("MMMM Do YYYY")}
                                             </span>
                                        </p>
                                        <hr className="my-2" />
                                        <div className="flex gap-3 justify-end">
                                             <button
                                                  className="bg-rose-100 px-5 py-2 rounded-lg text-rose-500"
                                                  onClick={() => DeletingBlog(_id as string)}
                                             >
                                                  <AiOutlineDelete size={22} />
                                             </button>
                                             <button
                                                  className={clsx("bg-orange-100 px-5 py-2 rounded-lg text-orange-500")}
                                                  onClick={() => ActivationBlog(_id as string)}
                                             >
                                                  {active.valueOf() ? (
                                                       <AiOutlineEye size={22} />
                                                  ) : (
                                                       <AiOutlineEyeInvisible size={22} />
                                                  )}
                                             </button>
                                             <button
                                                  onClick={() => navigate(`/blogs/manage/${_id}`)}
                                                  className="bg-primary-100 px-5 py-2 rounded-lg text-primary-500"
                                             >
                                                  <AiOutlineArrowRight size={22} />
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         ))}
               </div>
               {isBlogLoading && (
                    <div className="flex flex-col justify-center h-[300px] w-full items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Fetching Blogs Please wait...</h6>
                    </div>
               )}
               {isDeleteLoading && (
                    <div className="flex flex-col justify-center h-[300px] w-full items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Deleting Blogs Please wait...</h6>
                    </div>
               )}
               {isActivationLoading && (
                    <div className="flex flex-col justify-center h-[300px] w-full items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Activation of Blogs Please wait...</h6>
                    </div>
               )}
          </Layout>
     );
};
