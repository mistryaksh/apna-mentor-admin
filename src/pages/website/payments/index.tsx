import React, { useEffect } from "react";
import { Layout } from "../../../layout";
import {
     useCreatePlanOptionMutation,
     useGetAllPlanOptionQuery,
     useRemovePlanOptionMutation,
     useTogglePlanOptionStatusMutation,
} from "../../../app/async-action";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import moment from "moment";
import { AppButton, AppInput } from "../../../component";
import { addPoints, removePoint, setPointInput, usePaymentOptionSlice } from "../../../features";
import { useAppDispatch } from "../../../app/hooks";
import { Formik } from "formik";
import { PlanOptionProps, PlanOptionValidateSchema } from "../../../validation";
import { PaymentOptionProps } from "../../../interface";

export const PaymentMargins = () => {
     const { data: plans, isLoading: isGetLoading, isError: isGetError, error: getError } = useGetAllPlanOptionQuery();
     const [
          TogglePlanOption,
          {
               data: toggleData,
               isLoading: isToggleLoading,
               isError: isToggleError,
               error: toggleError,
               isSuccess: isToggleSuccess,
          },
     ] = useTogglePlanOptionStatusMutation();
     const [
          CreatePlans,
          {
               isError: isCreatePlanError,
               error: planError,
               isSuccess: isCreatePlanSuccess,
               data: createPlanData,
               isLoading: isCreateLoading,
          },
     ] = useCreatePlanOptionMutation();
     const dispatch = useAppDispatch();
     const [
          DeletePlanOption,
          {
               data: deleteData,
               isLoading: isDeleteLoading,
               isError: isDeleteError,
               error: deleteError,
               isSuccess: isDeleteSuccess,
          },
     ] = useRemovePlanOptionMutation();
     const { points, pointInput } = usePaymentOptionSlice();

     useEffect(() => {
          if (isGetError) {
               if ((getError as any).data) {
                    toast.error((getError as any).data.message);
               } else {
                    toast.error((getError as any).message);
               }
          }
          if (isToggleError) {
               if ((toggleError as any).data) {
                    toast.error((toggleError as any).data.message);
               } else {
                    toast.error((toggleError as any).message);
               }
          }

          if (isDeleteError) {
               if ((deleteError as any).data) {
                    toast.error((deleteError as any).data.message);
               } else {
                    toast.error((deleteError as any).message);
               }
          }

          if (isCreatePlanError) {
               if ((planError as any).data) {
                    toast.error((planError as any).data.message);
               } else {
                    toast.error((planError as any).message);
               }
          }

          if (isDeleteSuccess) {
               toast.warning(deleteData.data);
          }
          if (isToggleSuccess) {
               toast.warning(toggleData.data);
          }
          if (isCreatePlanSuccess) {
               toast.success(createPlanData.data);
          }
     }, [
          isGetError,
          getError,
          isToggleError,
          toggleError,
          isDeleteError,
          deleteError,
          isToggleSuccess,
          isDeleteSuccess,
          deleteData,
          toggleData,
          isCreatePlanError,
          isCreatePlanSuccess,
          planError,
          createPlanData,
     ]);

     const handleToggle = async (id: string) => {
          await TogglePlanOption(id);
     };

     const handleDeletePlanOption = async (id: string) => {
          await DeletePlanOption(id);
     };

     const handleSubmit = async (e: PaymentOptionProps) => {
          await CreatePlans({
               planName: e.planName,
               price: e.price,
               validFor: e.validFor,
               includes: points,
          });
     };

     const handlePoints = () => {
          if (!pointInput) {
               toast.error("Pleas enter something for points");
          } else {
               dispatch(addPoints(pointInput));
          }
     };

     return (
          <Layout pageTitle="Payment & margins">
               <div className="py-5  mt-20">
                    <div className="flex gap-5 items-center  justify-between">
                         <h1 className="text-2xl font-semibold capitalize">
                              You can manage <span className="text-primary-500 underline">payment plans</span> from here
                         </h1>
                    </div>
               </div>
               <div className="w-[90%] mx-auto rounded-lg my-5">
                    <div className="flex flex-col gap-10">
                         {!isGetLoading &&
                              !isDeleteLoading &&
                              !isToggleLoading &&
                              !isCreateLoading &&
                              plans?.data.map(
                                   ({ _id, planName, active, includes, price, offer, validFor, createdAt }) => (
                                        <div
                                             className="shadow-xl rounded-lg border border-primary-500 group p-3"
                                             key={_id}
                                        >
                                             <div className="flex justify-between">
                                                  <h6 className="text-2xl capitalize group-hover:text-primary-500 font-semibold pb-3">
                                                       {planName}
                                                  </h6>
                                                  <div className="flex items-center gap-5">
                                                       <p>
                                                            ₹ {price} <sub>({offer} off)</sub>
                                                       </p>
                                                       <button
                                                            type="button"
                                                            onClick={() => handleDeletePlanOption(_id as string)}
                                                            className="px-5 py-1 rounded-lg bg-primary-500 text-white"
                                                       >
                                                            <AiOutlineDelete size={24} />
                                                       </button>
                                                       {active ? (
                                                            <button
                                                                 type="button"
                                                                 onClick={() => handleToggle(_id as string)}
                                                                 className="px-5 py-1 rounded-lg bg-red-500 text-white"
                                                            >
                                                                 <IoMdCloseCircleOutline size={24} />
                                                            </button>
                                                       ) : (
                                                            <button
                                                                 type="button"
                                                                 onClick={() => handleToggle(_id as string)}
                                                                 className="px-5 py-1 rounded-lg bg-red-500 text-white"
                                                            >
                                                                 <IoMdCheckmarkCircleOutline size={24} />
                                                            </button>
                                                       )}
                                                  </div>
                                             </div>
                                             <div className="mb-3">
                                                  {includes?.map((element) => (
                                                       <p
                                                            key={element}
                                                            className="group-hover:text-gray-900 capitalize text-sm text-gray-500"
                                                       >
                                                            {element}
                                                       </p>
                                                  ))}
                                             </div>
                                             <hr />
                                             <div className="mt-3">
                                                  <p className="uppercase text-sm">
                                                       valid to {validFor} -{" "}
                                                       {moment(createdAt).format("DD-MM-YYYY HH:MM:SS A")}
                                                  </p>
                                             </div>
                                        </div>
                                   )
                              )}
                    </div>
                    {isGetLoading && (
                         <div className="flex flex-col gap-5 justify-center items-center text-center">
                              <AiOutlineLoading size={150} className="animate-spin fill-primary-500" />
                              <p className="text-xl text-gray-500">Fetching Data Please Wait...</p>
                         </div>
                    )}
                    {isToggleLoading && (
                         <div className="flex flex-col gap-5 justify-center items-center text-center">
                              <AiOutlineLoading size={150} className="animate-spin fill-primary-500" />
                              <p className="text-xl text-gray-500">Changing Plan Status Please Wait...</p>
                         </div>
                    )}
                    {isDeleteLoading && (
                         <div className="flex flex-col gap-5 justify-center items-center text-center">
                              <AiOutlineLoading size={150} className="animate-spin fill-primary-500" />
                              <p className="text-xl text-gray-500">Removing Plan Please Wait...</p>
                         </div>
                    )}

                    {isCreateLoading && (
                         <div className="flex flex-col gap-5 justify-center items-center text-center">
                              <AiOutlineLoading size={150} className="animate-spin fill-primary-500" />
                              <p className="text-xl text-gray-500">Creating Plan Please Wait...</p>
                         </div>
                    )}
                    <Formik
                         initialValues={{ planName: "", price: 0, validFor: "" } as PlanOptionProps}
                         validationSchema={PlanOptionValidateSchema}
                         onSubmit={handleSubmit}
                    >
                         {({ handleBlur, handleChange, handleSubmit, errors, values, touched }) => (
                              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                                   <div className="relative w-full my-6 mx-auto">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                             <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                                  <h3 className="text-2xl font-semibold capitalize">Upload new plan</h3>
                                             </div>

                                             <div className="px-5 py-10 flex gap-5 flex-col">
                                                  <div className="w-full">
                                                       <AppInput
                                                            placeholder="Monthly, Weekly, One day"
                                                            label="Enter plan name"
                                                            value={values.planName}
                                                            onChange={handleChange("planName")}
                                                            onBlur={handleBlur("planName")}
                                                            touched={touched.planName}
                                                            error={errors.planName}
                                                       />
                                                  </div>
                                                  <div className="flex items-center gap-5 w-full">
                                                       <AppInput
                                                            type="number"
                                                            placeholder="in rupees"
                                                            label="Enter Price (margin will add after saving it)"
                                                            value={values.price}
                                                            onChange={handleChange("price")}
                                                            onBlur={handleBlur("price")}
                                                            touched={touched.price}
                                                            error={errors.price}
                                                       />
                                                       <AppInput
                                                            type="number"
                                                            placeholder="in % (optional)"
                                                            label="Enter plan offer"
                                                            value={values.offer}
                                                            onChange={handleChange("offer")}
                                                            onBlur={handleBlur("offer")}
                                                            touched={touched.offer}
                                                            error={errors.offer}
                                                       />
                                                  </div>
                                                  {points?.length !== 0 && (
                                                       <div className="flex gap-5 flex-wrap my-5">
                                                            {points?.map((element, i) => (
                                                                 <div
                                                                      className="bg-primary-100 px-5 py-2 rounded-lg flex gap-3 items-center"
                                                                      key={i}
                                                                 >
                                                                      <p className="capitalize">{element}</p>
                                                                      <button
                                                                           onClick={() => dispatch(removePoint(i))}
                                                                           type="button"
                                                                      >
                                                                           <AiOutlineDelete size={22} />
                                                                      </button>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  )}
                                                  <div className="flex items-center gap-5">
                                                       <AppInput
                                                            placeholder="Add description point wise"
                                                            value={pointInput as string}
                                                            onChange={(e) => dispatch(setPointInput(e.target.value))}
                                                       />
                                                       <AppButton onClick={handlePoints} type="button" primary>
                                                            Add
                                                       </AppButton>
                                                  </div>
                                                  <div className="flex items-center gap-5 w-full">
                                                       <AppInput
                                                            placeholder="Valid till"
                                                            label="Offer valid till date"
                                                            value={values.validFor}
                                                            onChange={handleChange("validFor")}
                                                            onBlur={handleBlur("validFor")}
                                                            touched={touched.validFor}
                                                            error={errors.validFor}
                                                       />
                                                  </div>
                                             </div>

                                             <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                  <button
                                                       className="text-white bg-primary-500 active:bg-primary-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                       type="submit"
                                                  >
                                                       save changes
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </form>
                         )}
                    </Formik>
               </div>
          </Layout>
     );
};
