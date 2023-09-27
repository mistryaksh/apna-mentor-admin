import React, { useEffect, useState } from "react";
import { Layout } from "../../../../layout";
import { AppButton } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import {
     useGetAllDoctorQuery,
     useGetAllTopDoctorQuery,
     useRemoveTopDoctorMutation,
     useUploadTopDoctorMutation,
} from "../../../../app/async-action";
import { AiFillCloseCircle, AiFillDelete, AiOutlineLoading, AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { handleModel, useLayoutSlice } from "../../../../features";
import { useAppDispatch } from "../../../../app/hooks";
import { toast } from "react-toastify";
import { BiBlock } from "react-icons/bi";

export const TopDoctorPage = () => {
     const navigate = useNavigate();
     const [selectedId, setSelectedId] = useState<string>("");
     const dispatch = useAppDispatch();
     const { data: AllTopDoctor, isLoading, isError: isGetError, error: getError } = useGetAllTopDoctorQuery();
     const [UploadDoctor, { isLoading: isUploadLoading, error: uploadDoctorError, isError: isUploadError }] =
          useUploadTopDoctorMutation();
     const [
          RemoveDoctorFromList,
          { isError: isDeleteError, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, error: deleteError },
     ] = useRemoveTopDoctorMutation();
     const { data: AllDoctors } = useGetAllDoctorQuery();
     const { model } = useLayoutSlice();

     const UploadTopDoctor = async (id: string) => {
          if (!id) {
               toast.error("missing doctor ID");
          } else {
               await UploadDoctor(id);
               dispatch(handleModel());
          }
     };

     const handleDeleteTopDoctor = async (id: string) => {
          await RemoveDoctorFromList(id as string);
     };

     useEffect(() => {
          if (isUploadError) {
               if ((uploadDoctorError as any).name) {
                    toast.error((uploadDoctorError as any).message);
               }
               toast.error((uploadDoctorError as any).data.message);
          }
          if (isDeleteError) {
               if ((deleteError as any)?.data) {
                    toast.error((deleteError as any).data.message);
               } else {
                    console.log(deleteError);
               }
          }
          if (isGetError) {
               if ((getError as any)?.data) {
                    toast.error((getError as any).data.message);
               } else {
                    console.log(getError);
               }
          }
          if (isDeleteSuccess) {
               toast.success("Deleting...");
          }
     }, [isUploadError, uploadDoctorError, isDeleteError, deleteError, isGetError, getError, isDeleteSuccess]);
     return (
          <Layout pageTitle="Top Doctors Of Your Website">
               <div className="mt-20">
                    <div className="flex py-5 flex-wrap justify-between gap-3 items-center">
                         <div className="flex gap-3">
                              <button onClick={() => navigate("/doctors/manage")}>
                                   <IoArrowBack size={26} />
                              </button>
                              <h6 className="text-xl font-bold font-roboto capitalize">Manage top lists of doctors</h6>
                         </div>
                         {AllTopDoctor?.data.length && (
                              <div>
                                   <AppButton onClick={() => dispatch(handleModel())} primary>
                                        Add new
                                   </AppButton>
                              </div>
                         )}
                    </div>
               </div>
               {isLoading && (
                    <div className="flex flex-col justify-center h-[300px] items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Please wait...</h6>
                    </div>
               )}
               {isUploadLoading && (
                    <div className="flex flex-col justify-center h-[300px] items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Uploading top doctor please wait...</h6>
                    </div>
               )}
               {isDeleteLoading && (
                    <div className="flex flex-col justify-center h-[300px] items-center">
                         <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                         <h6 className="text-gray-500">Removing from doctor please wait...</h6>
                    </div>
               )}
               {!isLoading && !isUploadLoading && !isDeleteLoading && (
                    <div className="flex justify-center">
                         <div className="w-full flex flex-col gap-3">
                              {AllTopDoctor?.data.map(({ active, doctorId, _id }) => (
                                   <div key={_id} className="flex p-3 rounded-lg border justify-between items-center">
                                        <div>
                                             <p className="text-xl font-semibold font-poppins capitalize">
                                                  {doctorId?.name?.firstName} {doctorId?.name?.lastName}
                                             </p>
                                             <p className="flex gap-3 items-center text-sm">
                                                  <FiPhone />
                                                  {doctorId?.contact?.mobile}
                                             </p>
                                             <p className="flex gap-3 items-center text-sm">
                                                  <AiOutlineMail />
                                                  {doctorId?.contact?.email}
                                             </p>
                                        </div>
                                        <div className="flex flex-col gap-3 items-center">
                                             <div className="flex gap-2 items-center justify-end">
                                                  <AppButton
                                                       danger
                                                       onClick={() => handleDeleteTopDoctor(_id as string)}
                                                  >
                                                       <AiFillDelete size={22} />
                                                  </AppButton>
                                                  <AppButton
                                                       danger
                                                       onClick={() => handleDeleteTopDoctor(_id as string)}
                                                  >
                                                       <BiBlock size={22} />
                                                  </AppButton>
                                             </div>
                                             <p className="text-gray-500 text-xs">
                                                  Profile status :{" "}
                                                  <span className="font-semibold capitalize">
                                                       {active ? "active" : "inactive"}
                                                  </span>
                                             </p>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               )}
               {!AllTopDoctor?.data.length && (
                    <div className="h-[600px] flex justify-center items-center capitalize text-gray-500 rounded-lg flex-col gap-5">
                         No doctors are selected for top list, Start Adding By This Button
                         <AppButton onClick={() => dispatch(handleModel())} primary>
                              Start adding
                         </AppButton>
                    </div>
               )}
               {model && (
                    <>
                         <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-40">
                              <div className="relative w-[50%] my-6 mx-auto">
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                             <h3 className="text-3xl font=semibold">General Info</h3>
                                             <button
                                                  className="bg-transparent border-0 text-black float-right"
                                                  onClick={() => dispatch(handleModel())}
                                             >
                                                  <AiFillCloseCircle size={24} />
                                             </button>
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                             <label className="block text-black text-sm mb-1">Select Doctor</label>
                                             <select
                                                  onChange={(e) => {
                                                       setSelectedId(e.target.value);
                                                  }}
                                                  name="top_doctor"
                                                  id="top_doctor"
                                                  className="bg-gray-50 capitalize font-semibold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                             >
                                                  <option disabled selected value={""} className="capitalize">
                                                       Select doctor by name
                                                  </option>
                                                  {AllDoctors?.data.map(({ _id, name, workDetails }) => (
                                                       <option value={_id} className="capitalize">
                                                            Dr. {name.firstName} {name.lastName} -
                                                            {workDetails.hospital.specialization
                                                                 .map((x) => x)
                                                                 .join(", ")}
                                                       </option>
                                                  ))}
                                             </select>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                             <button
                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                  type="button"
                                                  onClick={() => dispatch(handleModel())}
                                             >
                                                  Close
                                             </button>

                                             <button
                                                  className="text-white bg-primary-500 active:bg-primary-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                  type="button"
                                                  onClick={() => UploadTopDoctor(selectedId)}
                                             >
                                                  Submit
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </>
               )}
          </Layout>
     );
};
