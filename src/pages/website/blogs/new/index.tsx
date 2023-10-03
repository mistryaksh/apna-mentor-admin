import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { Formik } from "formik";
import { INewBlogProps } from "../../../../interface";
import { NewBlogInitialValue, NewBlogValidationSchema } from "../../../../validation";
import { AppButton, AppInput } from "../../../../component";
import { handleBody, useBlogSlice } from "../../../../features";
import { useAppDispatch } from "../../../../app/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateNewBlogMutation } from "../../../../app/async-action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const NewBlogPage = () => {
     const dispatch = useAppDispatch();
     const { body } = useBlogSlice();
     const navigate = useNavigate();
     const [UploadBlog, { data, isError, error, isSuccess, isLoading }] = useCreateNewBlogMutation();

     const handleSubmit = async (e: INewBlogProps) => {
          console.log(e, body);
          await UploadBlog({
               label: e.label,
               image: e.image,
               body: body,
               active: true,
          });
     };

     useEffect(() => {
          if (isError) {
               toast.error((error as any).data.message);
          }
          if (isSuccess) {
               toast.success("Details updated");
               navigate("/blogs/manage", { replace: true });
          }
     }, [isSuccess, isError, error, navigate]);

     return (
          <Layout pageTitle="Write blogs for user">
               <div className="py-10 mt-20">
                    <div className="py-5">
                         <div className="flex gap-5 items-center">
                              <button
                                   onClick={() => navigate("/doctors/manage", { replace: true })}
                                   type="submit"
                                   className="flex gap-3"
                              >
                                   <IoArrowBack size={26} />
                                   <p className="capitalize text-lg">back</p>
                              </button>
                              <h1 className="text-3xl font-semibold capitalize">
                                   Enter details to upload{" "}
                                   <span className="text-primary-500 underline">doctor profile</span>
                              </h1>
                         </div>
                    </div>
                    <div className="my-20">
                         <Formik
                              onSubmit={handleSubmit}
                              initialValues={NewBlogInitialValue}
                              validationSchema={NewBlogValidationSchema}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-10">
                                             {values.image && (
                                                  <img className="rounded-lg" src={values.image} alt={values.label} />
                                             )}
                                             <div>
                                                  <AppInput
                                                       label="Enter blogs image link"
                                                       value={values.image}
                                                       onChange={handleChange("image")}
                                                       onBlur={handleBlur("image")}
                                                       error={errors.image as string}
                                                       touched={touched.image as boolean}
                                                  />
                                             </div>
                                             <div>
                                                  <AppInput
                                                       label="Enter blog title"
                                                       value={values.label}
                                                       placeholder="Choose best title for blogs"
                                                       onChange={handleChange("label")}
                                                       onBlur={handleBlur("label")}
                                                       error={errors.label as string}
                                                       touched={touched.label as boolean}
                                                  />
                                             </div>

                                             <div className="">
                                                  <ReactQuill
                                                       style={{ borderRadius: 10 }}
                                                       className="h-[300px] border-black outline-black"
                                                       theme="snow"
                                                       value={body}
                                                       onChange={(e) => dispatch(handleBody(e))}
                                                  />
                                             </div>
                                             <div className="flex justify-end gap-5 mt-10">
                                                  <AppButton type="button" danger>
                                                       Clear
                                                  </AppButton>
                                                  <AppButton type="submit" primary>
                                                       Save
                                                  </AppButton>
                                             </div>
                                        </div>
                                   </form>
                              )}
                         </Formik>
                    </div>
               </div>
          </Layout>
     );
};
