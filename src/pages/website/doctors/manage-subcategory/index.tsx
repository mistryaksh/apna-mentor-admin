import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useGetAllSubCategoryQuery, useCreateNewSubCategoryMutation, useDeleteSubCategoryByIdMutation, useLazyGetAllCategoryQuery } from "../../../../app/api";
import { AppButton, AppInput, PageTitle } from "../../../../component";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch } from "../../../../app/hooks";
import { handleNewCategoryModel, useCategorySlice } from "../../../../app/features";
import { Formik } from "formik";
import { SubCategoryValidationSchema, initialSubCategoryValues } from "../../../../validation";
import { ISubCategoryProps } from "../../../../interface";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

export const ManageSubCategoryPage = () => {
    const [GetAllCategory, {
        isError: isCategoryError,
        error: categoryError,
        isLoading: isCategoryLoading,
        data: categoryData,
    }] = useLazyGetAllCategoryQuery();
    const {
        data: category,
        isError: isSubCategoryError,
        error: subCategoryError,
        isLoading: isSubCategoryLoading,
    } = useGetAllSubCategoryQuery();
    const [
        NewCategory,
        {
            data: newCategoryData,
            isError: isNewCategoryError,
            error: newCategoryError,
            isSuccess: isNewCategorySuccess,
            isLoading: isNewCategoryLoading,
        }
    ] = useCreateNewSubCategoryMutation();
    const [
        DeleteCategoryById, 
        { 
            isError: isDeleteCategoryError,
            error: deleteCategoryError,
            isLoading: isDeleteCategoryLoading,
            data: deleteCategoryData,
            isSuccess: isDeleteCategorySuccess,
        }
    ] = useDeleteSubCategoryByIdMutation();
    const { newModel } = useCategorySlice();
    const dispatch = useAppDispatch();

    const onSubmitHandle = async ({ label, categoryId, subTitle, desc, symptoms = [], treatment = [], causes = [] }: ISubCategoryProps) => {
        await NewCategory({
            label, categoryId, subTitle, desc, symptoms, treatment, causes,
            _id: ""
        });
        dispatch(handleNewCategoryModel({ newModel: false } as any));
        toast.success("Category created successfully", newCategoryData);
    };

    const DeleteAction = async (id: string) => {
        await DeleteCategoryById(id);
        dispatch(handleNewCategoryModel({ newModal: false } as any));
        toast.success("Category deleted successfully", deleteCategoryData);
    };

    useEffect(() => {
        if (isCategoryError) {
            console.log(categoryError);
        }
        if (isSubCategoryError) {
            console.log(subCategoryError);
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
    }, [newCategoryData, isNewCategoryError, newCategoryError, isNewCategoryLoading, isCategoryLoading, isCategoryError, categoryError, isNewCategorySuccess, dispatch, category?.data, category?.data.length, isDeleteCategoryError, deleteCategoryError, isDeleteCategorySuccess, deleteCategoryData, isDeleteCategoryLoading, isSubCategoryError, subCategoryError, isSubCategoryLoading, categoryData?.data, GetAllCategory]);

    return (
        <Layout pageTitle="Manage Category">
            <div>
                <PageTitle
                        title={`Manage Mentor Sub-Categories`}
                        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, distinctio."
                />
            </div>
            <div className="flex justify-end items-center mb-8">
                <AppButton primary onClick={() => dispatch(handleNewCategoryModel())}>
                        Add new
                </AppButton>
            </div>
            {isCategoryLoading && isDeleteCategoryLoading && (
                <div className="flex justify-center flex-col items-center gap-4">
                        <AiOutlineLoading size={150} className="animate-spin text-primary-500" />
                        <p className="text-gray-500 font-mono">Mentors are loading....</p>
                </div>
            )}
            {!isCategoryLoading && !isDeleteCategoryLoading && category?.data.length !== 0 && (
                <DataTable
                        pagination
                        paginationPerPage={20}
                        noDataComponent={
                            <div>
                                <h6>There are no mentor to show</h6>
                                <AppButton primary>New subcategory</AppButton>
                            </div>
                        }
                        progressComponent={
                            <div className="">
                                <AiOutlineLoading size={150} />
                                <p>Sub categories are loading....</p>
                            </div>
                        }
                        data={category?.data || []}
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
                                name: "Title",
                                width: "200px",

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
                                name: "SubTitle",
                                width: "250px",
                                cell: ({ subTitle }) => (
                                    <div>
                                        <p className="capitalize">{subTitle}</p>
                                    </div>
                                ),
                            },
                            {
                                id: "#",
                                name: "Description",
                                width: "420px",
                                cell: ({ desc }) => (
                                    <div className="py-3.5">
                                        <p className="uppercase">{desc}</p>
                                    </div>
                                ),
                            },
                            {
                                id: "#",
                                name: "Category",
                                width: "200px",
                                cell: ({ categoryId }) => (
                                    <div>
                                        <p className="uppercase">{categoryId.title}</p>
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
            )}
            {newModel && (
                <>
                        <Formik
                            initialValues={initialSubCategoryValues}
                            validationSchema={SubCategoryValidationSchema}
                            onSubmit={onSubmitHandle}
                        >
                            {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-3/5 my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold capitalize">
                                                            Create new subcategory
                                                        </h3>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto">
                                                        <div className="flex items-center gap-4 w-full mb-4">
                                                            <AppInput
                                                                placeholder="Enter title"
                                                                value={values.label}
                                                                onChange={handleChange("label")}
                                                                onBlur={handleBlur("label")}
                                                                error={errors.label}
                                                                touched={touched.label}
                                                            />
                                                            <AppInput
                                                                placeholder="Enter subTitle"
                                                                value={values.subTitle}
                                                                onChange={handleChange("subTitle")}
                                                                onBlur={handleBlur("subTitle")}
                                                                error={errors.subTitle}
                                                                touched={touched.subTitle}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <textarea
                                                                placeholder="Enter description"
                                                                value={values.desc}
                                                                onChange={handleChange("desc")}
                                                                onBlur={handleBlur("desc")}
                                                                className="border focus:outline-none border-gray-400 focus:border-primary-500 py-2 rounded-lg px-3"
                                                            />
                                                        </div>
                                                        <div className="flex-1 mt-3">
                                                            <label htmlFor="category" className="capitalize text-gray-500 text-sm mb-2.5">
                                                                Category
                                                            </label>
                                                            <select
                                                                onChange={handleChange("categoryId")}
                                                                onBlur={handleBlur("categoryId")}
                                                                value={values.categoryId as any}
                                                                className="p-3 w-full border focus:border-teacher-500 rounded-md focus:outline-none"
                                                            >
                                                                <option defaultValue={"none"} disabled selected>
                                                                    Select category
                                                                </option>
                                                                {categoryData?.data.map((category) => (
                                                                <option
                                                                    defaultValue={category?._id}
                                                                    value={category?._id}
                                                                    key={category?._id}
                                                                >
                                                                    {category.title}
                                                                </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => dispatch(handleNewCategoryModel())}
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
