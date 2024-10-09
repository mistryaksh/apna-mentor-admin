import React, { useEffect } from "react";

import { Layout } from "../../../../layout";
import {
  useLazyGetAllCategoryQuery,
  useCreateNewCategoryMutation,
  useDeleteCategoryByIdMutation,
} from "../../../../app/api";
import { AppButton, AppInput, PageTitle } from "../../../../component";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch } from "../../../../app/hooks";
import {
  handleNewCategoryModel,
  useCategorySlice,
} from "../../../../app/features";
import { Formik } from "formik";
import {
  CategoryValidationSchema,
  initialCategoryValues,
} from "../../../../validation";
import { ICategoryProps } from "../../../../interface";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const ManageCategoryPage = () => {
  const [
    GetAllCategory,
    {
      data: category,
      isError: isCategoryError,
      error: categoryError,
      isLoading: isCategoryLoading,
    },
  ] = useLazyGetAllCategoryQuery();
  const [
    NewCategory,
    {
      data: newCategoryData,
      isError: isNewCategoryError,
      error: newCategoryError,
      isSuccess: isNewCategorySuccess,
      isLoading: isNewCategoryLoading,
    },
  ] = useCreateNewCategoryMutation();
  const [
    DeleteCategoryById,
    {
      isError: isDeleteCategoryError,
      error: deleteCategoryError,
      isLoading: isDeleteCategoryLoading,
      data: deleteCategoryData,
      isSuccess: isDeleteCategorySuccess,
    },
  ] = useDeleteCategoryByIdMutation();
  const { newModel } = useCategorySlice();
  const dispatch = useAppDispatch();

  const onSubmitHandle = async ({ status, title }: ICategoryProps) => {
    await NewCategory({
      status,
      title,
      _id: "",
    });
    dispatch(handleNewCategoryModel({ newModel: false } as any));
    toast.success("Category created successfully", newCategoryData);
  };

  const DeleteAction = async (id: string) => {
    await DeleteCategoryById(id);
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
  }, [
    newCategoryData,
    isNewCategoryError,
    newCategoryError,
    isNewCategoryLoading,
    isCategoryLoading,
    isCategoryError,
    categoryError,
    isNewCategorySuccess,
    dispatch,
    category?.data,
    category?.data?.length,
    isDeleteCategoryError,
    deleteCategoryError,
    isDeleteCategorySuccess,
    deleteCategoryData,
    GetAllCategory,
  ]);

  const navigate = useNavigate();

  return (
    <Layout pageTitle="Manage Category">
      <div>
        <PageTitle
          title={`Manage Mentor Categories`}
          subTitle="You can manage mentor types here e.g Healers, Buddy, Genie"
        />
      </div>
      <div className="flex justify-end items-center mb-8 gap-3">
        <AppButton primary onClick={() => navigate("/mentors/manage")}>
          Mentor List
        </AppButton>
        <AppButton
          primary
          onClick={() =>
            dispatch(handleNewCategoryModel({ newModel: true } as any))
          }
        >
          Add new
        </AppButton>
      </div>
      {category?.data.length !== 0 &&
        !isCategoryLoading &&
        !isDeleteCategoryLoading && (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {category?.data.map(({ status, title, _id, createdAt }, i) => (
              <div
                key={_id}
                className="relative group border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500"
              >
                <div className=" mb-6 ">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66699 12.8162L11.3501 15.4993C11.5616 15.7107 11.9043 15.7109 12.1158 15.4997L17.8753 9.75033M13.0003 23.8337C7.01724 23.8337 2.16699 18.9834 2.16699 13.0003C2.16699 7.01724 7.01724 2.16699 13.0003 2.16699C18.9834 2.16699 23.8337 7.01724 23.8337 13.0003C23.8337 18.9834 18.9834 23.8337 13.0003 23.8337Z"
                      // stroke="#4F46E5"
                      className={
                        !status ? "stroke-red-500" : "stroke-green-500"
                      }
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
                  {title}
                </h4>
                <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 ">
                  Provides faster transaction, so money arrives in realtime
                </p>
                <div className="flex justify-between mt-3 items-center">
                  <p className="text-sm text-gray-500">
                    {moment(createdAt).format("Do MMM YYYY hh:mm A")}
                  </p>
                  <button
                    onClick={() => DeleteAction(_id as string)}
                    className="border border-transparent group-hover:border-red-500 p-1 rounded-md"
                  >
                    <AiOutlineDelete
                      size={20}
                      className="group-hover:fill-red-500"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      {isCategoryLoading && isDeleteCategoryLoading && (
        <div className="flex justify-center items-center h-[300px]">
          <AiOutlineLoading
            size={150}
            className="fill-primary-500 animate-spin"
          />
        </div>
      )}
      {newModel && (
        <>
          <Formik
            initialValues={initialCategoryValues}
            validationSchema={CategoryValidationSchema}
            onSubmit={onSubmitHandle}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
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
                              checked={values.status}
                            />
                            <label className="select-none" htmlFor="status">
                              Upload as active
                            </label>
                            <p>
                              (This option will display category on website's
                              home)
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() =>
                            dispatch(
                              handleNewCategoryModel({ newModel: false } as any)
                            )
                          }
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
