import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useLazyGetAllCategoryQuery, useCreateNewCategoryMutation, useDeleteCategoryByIdMutation } from "../../../../app/api";
import { AppButton, AppInput, PageTitle } from "../../../../component";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useAppDispatch } from "../../../../app/hooks";
import { handleNewCategoryModel, useCategorySlice } from "../../../../app/features";
import { Formik } from "formik";
import { CategoryValidationSchema, initialCategoryValues } from "../../../../validation";
import { ICategoryProps } from "../../../../interface";
import { toast } from "react-toastify";

export const ManageCategoryPage = () => {
     const [GetAllCategory, {
          data: category,
          isError: isCategoryError,
          error: categoryError,
          isLoading: isCategoryLoading,
     }] = useLazyGetAllCategoryQuery();
     const [
          NewCategory,
          {
               data: newCategoryData,
               isError: isNewCategoryError,
               error: newCategoryError,
               isSuccess: isNewCategorySuccess,
               isLoading: isNewCategoryLoading,
          }
     ] = useCreateNewCategoryMutation();
     const [
          DeleteCategoryById, 
          { 
               isError: isDeleteCategoryError,
               error: deleteCategoryError,
               isLoading: isDeleteCategoryLoading,
               data: deleteCategoryData,
               isSuccess: isDeleteCategorySuccess,
          }
     ] = useDeleteCategoryByIdMutation();
     const { newModel } = useCategorySlice();
     const dispatch = useAppDispatch();

     const onSubmitHandle = async ({ status, title }: ICategoryProps) => {
          await NewCategory({
               status, title,
               _id: ""
          });
          dispatch(handleNewCategoryModel({ newModel: false } as any));
          toast.success("Category created successfully", newCategoryData);
     };

     const DeleteAction = async (id: string) => {
          await DeleteCategoryById(id);
          dispatch(handleNewCategoryModel({ newModel: false } as any));
          toast.success("Category deleted successfully", deleteCategoryData);
     };

     useEffect(() => {
          if (isCategoryError) {
               console.log(categoryError);
          }
          if (isNewCategoryError) {
               console.log(categoryError);
          }
          if (isDeleteCategoryError) {
               console.log(deleteCategoryError);
          }
          (async () => {
               await GetAllCategory();
          })();
     }, [newCategoryData, isNewCategoryError, newCategoryError, isNewCategoryLoading, isCategoryLoading, isCategoryError, categoryError, isNewCategorySuccess, dispatch, category?.data, category?.data?.length, isDeleteCategoryError, deleteCategoryError, isDeleteCategorySuccess, deleteCategoryData, GetAllCategory])

     return (
          <Layout pageTitle="Manage Category">
               <div>
                    <PageTitle
                         title={`Manage Mentor Categories`}
                         subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, distinctio."
                    />
               </div>
               <div className="flex justify-end items-center mb-8">
                    <AppButton primary onClick={() => dispatch(handleNewCategoryModel({ newModel: true } as any))}>
                         Add new
                    </AppButton>
               </div>
               {category?.data.length !== 0 && !isCategoryLoading && (
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-10">
                         {category?.data.map(({ status, title, _id }, i) => (
                              <div key={i} className="border p-3 hover:shadow-xl rounded-xl">
                                   <h6 className="text-2xl text-gray-900 capitalize">{title}</h6>
                                   <p className="text-gray-500">currently {status ? "active" : "in active"}</p>
                                   <div className="flex gap-5 justify-end my-3">
                                        <button type="button" onClick={() => DeleteAction(_id as string)} className="text-gray-500 hover:text-primary-500 duration-150">
                                             <AiOutlineDelete size={22} />
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               )}
               {newModel && (
                    <>
                         <Formik
                              initialValues={initialCategoryValues}
                              validationSchema={CategoryValidationSchema}
                              onSubmit={onSubmitHandle}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                             <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                  {/*content*/}
                                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                       {/*header*/}
                                                       <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold capitalize">
                                                                 create new category for mentors
                                                            </h3>
                                                       </div>
                                                       {/*body*/}
                                                       <div className="relative p-6 flex-auto">
                                                            <div>
                                                                 <AppInput
                                                                      placeholder="Enter title"
                                                                      value={values.title}
                                                                      onChange={handleChange("title")}
                                                                      onBlur={handleBlur("title")}
                                                                      error={errors.title}
                                                                      touched={touched.title}
                                                                 />
                                                                 <div className="flex items-center gap-3 justify-start text-gray-500">
                                                                      <input
                                                                           onChange={handleChange("status")}
                                                                           onBlur={handleBlur("status")}
                                                                           name="status"
                                                                           id="status"
                                                                           type="checkbox"
                                                                           value={values.status ? 1 : 0}
                                                                      />
                                                                      <label className="select-none" htmlFor="status">
                                                                           Upload as active
                                                                      </label>
                                                                      <p>
                                                                           (This option will display category on
                                                                           website's home)
                                                                      </p>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       {/*footer*/}
                                                       <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                            <button
                                                                 className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                 type="button"
                                                                 onClick={() => dispatch(handleNewCategoryModel({ newModel: false } as any))}
                                                            >
                                                                 Close
                                                            </button>
                                                            <button
                                                                 className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                 type="submit"
                                                            >
                                                                 Save
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                   </form>
                              )}
                         </Formik>
                    </>
               )}
          </Layout>
     );
};
