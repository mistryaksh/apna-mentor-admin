import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useGetAllUsersQuery, useUpdateUserBlockStatusMutation } from "../../../../app/async-action";
import { toast } from "react-toastify";
import { AppButton } from "../../../../component";
import { UserProps } from "../../../../interface";
import { BiBlock } from "react-icons/bi";
import { AiOutlineLoading, AiOutlineMail, AiOutlinePhone, AiOutlineShareAlt } from "react-icons/ai";
import DataTable from "react-data-table-component";
import moment from "moment";

export const UsersPage = () => {
     const { data, isError, error, isLoading } = useGetAllUsersQuery();
     const [BlockStatus, { isError: isBlockError, error: blockError, isLoading: isBlockLoading }] =
          useUpdateUserBlockStatusMutation();
     console.log(data);

     useEffect(() => {
          if (isError) {
               if ((error as any).data.message) {
                    console.log((error as any).data.message);
                    toast.error((error as any).data.message);
               } else {
                    console.log((error as any).message);
                    toast.error((error as any).message);
               }
          }
          if (isBlockError) {
               if ((blockError as any).data.message) {
                    toast.error((blockError as any).data.message);
               } else {
                    toast.error((blockError as any).message);
               }
          }
     }, [isError, error, isBlockError, blockError]);

     const UpdateStatus = async (id: string) => {
          await BlockStatus(id);
     };

     return (
          <Layout pageTitle="Manage Users">
               <div className="mt-20">
                    <p className="text-gray-500">
                         You can manage list of your users's or check details of all the users
                    </p>
                    <div className="flex py-5 flex-wrap justify-between items-center">
                         <h6 className="text-xl font-bold font-roboto">Manage</h6>
                         <div className="gap-3 flex">
                              <AppButton primary>Select All</AppButton>
                         </div>
                    </div>
                    {isBlockLoading && (
                         <div className="flex flex-col justify-center h-[300px] items-center">
                              <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                              <h6 className="text-gray-500">Blocking the user profile Please wait...</h6>
                         </div>
                    )}
                    {isLoading && (
                         <div className="flex flex-col justify-center gap-5 h-[300px] items-center">
                              <AiOutlineLoading className="w-[100px] fill-primary-500 h-[100px] animate-spin" />
                              <h6 className="text-gray-500">Fetching the user profile Please wait...</h6>
                         </div>
                    )}
                    {!isLoading && !isBlockLoading && (
                         <div>
                              <DataTable
                                   paginationPerPage={10}
                                   paginationServer
                                   paginationTotalRows={data?.data.length}
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
                                             name: "User",
                                             selector: (row: any) => row.name,
                                             cell: (row: UserProps) => (
                                                  <div className="font-poppins capitalize">
                                                       <div className="flex items-center gap-3 font-poppins lowercase">
                                                            <p className="text-sm capitalize">
                                                                 {row.name.firstName} {row.name.lastName}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "200px",
                                             id: "mobile",
                                             sortable: false,
                                             name: "Phone number",
                                             selector: (row: any) => row.mobile,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center gap-3 text-gray-500 font-poppins lowercase">
                                                       <AiOutlinePhone size={18} />
                                                       <p className="text-sm capitalize">{row.mobile}</p>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "250px",
                                             id: "email",
                                             sortable: false,
                                             name: "Email address",
                                             selector: (row: any) => row.email,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center text-gray-500 gap-3 font-poppins lowercase">
                                                       <AiOutlineMail size={18} />
                                                       <p className="text-sm">{row.email}</p>
                                                  </div>
                                             ),
                                        },

                                        {
                                             width: "150px",
                                             id: "verified",
                                             sortable: false,
                                             name: "Verification",
                                             selector: (row: any) => row.email,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center gap-3 font-poppins uppercase">
                                                       {row.verified ? (
                                                            <div className="text-emerald-500 flex items-center gap-2">
                                                                 <p className="p-1 bg-emerald-500 rounded-full uppercase text-xs" />
                                                                 Verified
                                                            </div>
                                                       ) : (
                                                            <div className="text-yellow-500 flex items-center gap-2">
                                                                 <p className="p-1 bg-yellow-500 rounded-full uppercase text-xs" />
                                                                 Pending
                                                            </div>
                                                       )}
                                                  </div>
                                             ),
                                        },

                                        {
                                             width: "150px",
                                             id: "online",
                                             sortable: false,
                                             name: "Profile Status",
                                             selector: (row: any) => row.email,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center gap-3 font-poppins uppercase">
                                                       {row.online ? (
                                                            <div className="text-emerald-500 flex items-center gap-2">
                                                                 <p className="p-1 bg-green-500 rounded-full text-xs" />
                                                                 online
                                                            </div>
                                                       ) : (
                                                            <div className="text-rose-500 flex items-center gap-2">
                                                                 <p className="p-1 bg-rose-500 rounded-full text-xs" />
                                                                 offline
                                                            </div>
                                                       )}
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "150px",
                                             id: "block",
                                             sortable: false,
                                             name: "Registered on",
                                             selector: (row: any) => row.email,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center gap-3 font-poppins lowercase">
                                                       {row.block ? (
                                                            <div className="text-rose-500 uppercase">blocked</div>
                                                       ) : (
                                                            <div className="text-emerald-500 uppercase">unblocked</div>
                                                       )}
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "250px",
                                             id: "createdAt",
                                             sortable: false,
                                             name: "Registered on",
                                             selector: (row: any) => row.createdAt,
                                             cell: (row: UserProps) => (
                                                  <div className="flex items-center  gap-3 font-poppins capitalize">
                                                       <p className="text-xs">
                                                            {moment(row.createdAt).format("MMMM Do YYYY")}
                                                       </p>
                                                  </div>
                                             ),
                                        },
                                        {
                                             width: "120px",
                                             id: "actions",
                                             sortable: false,
                                             name: "Profile Actions",
                                             center: true,
                                             cell: (row: UserProps) => {
                                                  return (
                                                       <div className="flex justify-center items-center font-poppins capitalize gap-3 px-2">
                                                            <button
                                                                 onClick={() => UpdateStatus(row._id as string)}
                                                                 className="bg-primary-100 rounded-lg px-3 py-1"
                                                            >
                                                                 <BiBlock className="fill-red-500" size={22} />
                                                            </button>
                                                            <button className="bg-primary-100 rounded-lg px-3 py-1">
                                                                 <AiOutlineShareAlt
                                                                      className="fill-primary-500"
                                                                      size={22}
                                                                 />
                                                            </button>
                                                       </div>
                                                  );
                                             },
                                        },
                                   ]}
                                   data={data?.data || []}
                              />
                         </div>
                    )}
               </div>
          </Layout>
     );
};
