import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { AppButton } from "../../../../component";
import {
     useBlockUnblockDoctorProfileMutation,
     useDeleteDoctorByIdMutation,
     useGetAllDoctorQuery,
} from "../../../../app/async-action";
import DataTable from "react-data-table-component";
import { AiOutlineDelete, AiOutlineLoading, AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IDoctorProps } from "../../../../interface";
import { FaStethoscope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { BiBlock } from "react-icons/bi";
import moment from "moment";

export const DoctorsPage = () => {
     const { isError: isGetError, data: AllDoctors, error: getError, isLoading: isGetLoading } = useGetAllDoctorQuery();
     const [
          DeleteFunction,
          { isError: isDeleteError, isLoading: isDeleteLoading, error: deleteError, data, isSuccess: isDeleteSuccess },
     ] = useDeleteDoctorByIdMutation();
     const [BlockFunction, { isError: isBlockError, isLoading: isBlockLoading, error: blockError }] =
          useBlockUnblockDoctorProfileMutation();
     const navigate = useNavigate();

     useEffect(() => {
          if (isGetError) {
               toast.error((getError as any).data.message);
          }
          if (isDeleteSuccess) {
               toast.success(data.data);
          }
          if (isDeleteError) {
               toast.error((deleteError as any).data.message);
          }
          if (isBlockError) {
               toast.error((blockError as any).data.message);
          }
     }, [isGetError, getError, isDeleteSuccess, data, isDeleteError, deleteError, isBlockError, blockError]);

     const handleDelete = async (id: string) => {
          await DeleteFunction(id);
     };

     const handleBlock = async (id: string) => {
          await BlockFunction(id);
     };

     return (
          <Layout pageTitle="Manage doctors">
               <div className="mt-20">
                    <p className="text-gray-500">
                         You can manage top list of your doctor's or check details of all the doctors
                    </p>
                    <div className="flex py-5 flex-wrap justify-between items-center">
                         <h6 className="text-xl font-bold font-roboto">Manage</h6>
                         <div className="gap-3 flex">
                              <AppButton onClick={() => navigate("/doctors/top-lists")} primary>
                                   Top lists
                              </AppButton>
                              <AppButton onClick={() => navigate("/doctors/new", { replace: true })} primary>
                                   New
                              </AppButton>
                         </div>
                    </div>
               </div>
               <div>
                    {isGetLoading && (
                         <div className="flex flex-col justify-center h-[300px] items-center">
                              <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                              <h6 className="text-gray-500">Please wait...</h6>
                         </div>
                    )}
                    {isDeleteLoading && (
                         <div className="flex flex-col justify-center h-[300px] items-center">
                              <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                              <h6 className="text-gray-500">Removing the doctor...</h6>
                         </div>
                    )}
                    {isBlockLoading && (
                         <div className="flex flex-col justify-center h-[300px] items-center">
                              <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                              <h6 className="text-gray-500">Blocking the doctor profile Please wait...</h6>
                         </div>
                    )}
                    {!isDeleteLoading && !isGetLoading && !isBlockLoading && (
                         <div>
                              <DataTable
                                   theme="default"
                                   paginationPerPage={10}
                                   paginationServer
                                   paginationTotalRows={AllDoctors?.data.length}
                                   selectableRows
                                   className="font-poppins"
                                   highlightOnHover
                                   keyField="row._id"
                                   pagination
                                   defaultSortFieldId={1}
                                   columns={[
                                        {
                                             id: "#",
                                             name: "#",
                                             width: "50px",
                                             cell: (_, index) => index + 1,
                                        },
                                        {
                                             width: "200px",
                                             id: "name",
                                             sortable: false,
                                             name: "Doctor",
                                             selector: (row: any) => row.name,
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <div className="flex items-center gap-3 font-poppins lowercase">
                                                            <p className="text-sm capitalize">
                                                                 Dr. {row.name.firstName} {row.name.lastName}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "150px",
                                             id: "username",
                                             sortable: false,
                                             name: "Username",
                                             selector: (row: any) => row.name,
                                             cell: (row: IDoctorProps) => (
                                                  <div
                                                       className="font-poppins text-gray-500 capitalize"
                                                       onClick={() => console.log(row._id)}
                                                  >
                                                       <div className="flex items-center gap-3 font-poppins lowercase">
                                                            <FaStethoscope size={16} />
                                                            <p className="capitalize">{row.authDetails.username}</p>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "180px",
                                             id: "mobile",
                                             sortable: false,
                                             name: "Mobile number",
                                             selector: (row: any) => row.name,
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <div className="flex items-center  gap-3 font-poppins lowercase text-gray-500">
                                                            <FiPhone size={16} />
                                                            <span className="capitalize">{row.contact.mobile}</span>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "150px",
                                             id: "email",
                                             sortable: false,
                                             name: "Email address",
                                             selector: (row: any) => row.name,
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <div className="flex items-center  gap-3 font-poppins lowercase text-gray-500">
                                                            <AiOutlineMail size={16} />
                                                            <span className=" capitalize">{row.contact.email}</span>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "250px",
                                             id: "Address",
                                             sortable: false,
                                             name: "Home Address",
                                             selector: (row: any) => row.contact.address,
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <div className="flex items-center  gap-3 font-poppins lowercase text-gray-500">
                                                            <IoLocationOutline size={22} />
                                                            <span className="capitalize">{row.contact.address}</span>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "120px",
                                             id: "verification",
                                             sortable: false,
                                             name: "Verification",
                                             selector: (row: any) => row.verified,
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       {row.verified ? (
                                                            <div className="flex items-center gap-2">
                                                                 <p className="p-1 bg-green-500 rounded-full" />
                                                                 Verified
                                                            </div>
                                                       ) : (
                                                            <div className="flex items-center gap-2">
                                                                 <p className="p-1 bg-yellow-500 rounded-full" />
                                                                 Pending
                                                            </div>
                                                       )}
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "120px",
                                             id: "online",
                                             sortable: false,
                                             name: "Online",
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       {row.online ? (
                                                            <div className="flex items-center gap-2">
                                                                 <p className="p-1 bg-green-500 rounded-full" />
                                                                 online
                                                            </div>
                                                       ) : (
                                                            <div className="flex items-center gap-2">
                                                                 <p className="p-1 bg-red-500 rounded-full" />
                                                                 offline
                                                            </div>
                                                       )}
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "120px",
                                             id: "block",
                                             sortable: false,
                                             name: "Block",
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       {row.block ? (
                                                            <div className="flex items-center text-green-500 gap-2">
                                                                 blocked
                                                            </div>
                                                       ) : (
                                                            <div className="flex items-center text-red-500 gap-2">
                                                                 unblocked
                                                            </div>
                                                       )}
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "220px",
                                             id: "block",
                                             sortable: false,
                                             name: "Registered On",
                                             cell: (row: IDoctorProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <p>{moment(row.createdAt).format("MMMM Do YYYY")}</p>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "120px",
                                             id: "actions",
                                             sortable: false,
                                             name: "Profile Actions",
                                             center: true,
                                             cell: (row: IDoctorProps) => {
                                                  return (
                                                       <div className="flex justify-center items-center font-poppins capitalize gap-3 px-2">
                                                            <button
                                                                 onClick={() => handleBlock(row._id as string)}
                                                                 className="bg-primary-100 rounded-lg px-3 py-1"
                                                            >
                                                                 <BiBlock className="fill-red-500" size={22} />
                                                            </button>
                                                            <button
                                                                 onClick={() => handleDelete(row._id as string)}
                                                                 className="bg-primary-100 rounded-lg px-3 py-1"
                                                            >
                                                                 <AiOutlineDelete className="fill-gray-500" size={22} />
                                                            </button>
                                                       </div>
                                                  );
                                             },
                                        },
                                   ]}
                                   data={AllDoctors?.data || []}
                              />
                         </div>
                    )}
               </div>
          </Layout>
     );
};
