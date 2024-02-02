import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useGetAllMentorQuery } from "../../../../app/api";
import { AppButton, PageTitle } from "../../../../component";
import DataTable from "react-data-table-component";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import clsx from "clsx";
import { MdOutlineVerified } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const DoctorsPage = () => {
     const navigate = useNavigate();
     const {
          data: mentors,
          isError: isMentorError,
          error: mentorError,
          isFetching: isMentorFetching,
     } = useGetAllMentorQuery();

     useEffect(() => {
          if (isMentorError) {
               console.log(mentorError);
          }
     }, [isMentorError, mentorError]);
     return (
          <Layout pageTitle="Manage doctors">
               <PageTitle title="Mentor List" subTitle="You can manage mentors lists from here" />
               <div className="p-3 mb-5">
                    <div className="flex items-center gap-5 justify-end">
                         <AppButton primary onClick={() => navigate("/mentors/new")}>
                              New Mentors
                         </AppButton>
                         <p>Total Mentors - {mentors?.data.length}</p>
                         <AppButton primary onClick={() => navigate("/mentors/categories")}>
                              Categories
                         </AppButton>
                         <AppButton primary>Sub Categories</AppButton>
                    </div>
               </div>
               {isMentorFetching && (
                    <div className="flex justify-center flex-col items-center gap-4">
                         <AiOutlineLoading size={150} className="animate-spin text-primary-500" />
                         <p className="text-gray-500 font-mono">Mentors are loading....</p>
                    </div>
               )}
               {!isMentorFetching && mentors?.data.length !== 0 && (
                    <DataTable
                         pagination
                         paginationPerPage={20}
                         noDataComponent={
                              <div>
                                   <h6>There are no mentor to show</h6>
                                   <AppButton primary>New Mentor</AppButton>
                              </div>
                         }
                         progressComponent={
                              <div className="">
                                   <AiOutlineLoading size={150} />
                                   <p>Mentors are loading....</p>
                              </div>
                         }
                         data={mentors?.data || []}
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
                                   name: "Name",
                                   width: "300px",

                                   cell: ({ name, contact }) => (
                                        <div className="py-5">
                                             <p className="text-md capitalize text-lg">
                                                  {name.firstName} {name.lastName}
                                             </p>
                                             <div className="flex items-center gap-3">
                                                  <AiOutlineMail size={18} className="text-gray-500" />
                                                  <p className="text-md text-md text-gray-500">{contact.email}</p>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <AiOutlinePhone size={18} className="text-gray-500" />
                                                  <p className="text-md capitalize text-md text-gray-500">
                                                       {contact.mobile}
                                                  </p>
                                             </div>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Username",
                                   width: "200px",
                                   cell: ({ auth, updatedAt }) => (
                                        <div>
                                             <p className="capitalize">{auth.username}</p>
                                             <p>Last Update : {moment(updatedAt).format("MMMM Do YYYY hh:mm A")}</p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Categories",
                                   width: "300px",
                                   cell: ({ category, subCategory }) => (
                                        <div>
                                             <p className="uppercase">{category.title}</p>
                                             <div className="flex gap-3">
                                                  <span className="font-semibold text-gray-500">Services :</span>{" "}
                                                  {subCategory.map(({ label }, i) => (
                                                       <p key={i} className="text-gray-500">
                                                            {label}
                                                       </p>
                                                  ))}
                                             </div>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Specialists",
                                   width: "200px",
                                   cell: ({ specialists }) => (
                                        <div>
                                             <p className="capitalize text-gray-500">{specialists.join(", ")}</p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "#",
                                   name: "Status",
                                   width: "280px",
                                   cell: ({ accountStatus }) => (
                                        <div className="flex gap-5 items-center">
                                             <MdOutlineBlock
                                                  size={25}
                                                  className={clsx(
                                                       accountStatus.block ? "text-red-500" : "text-gray-500"
                                                  )}
                                             />
                                             <MdOutlineVerified
                                                  size={25}
                                                  className={clsx(
                                                       accountStatus.verification ? "text-green-500" : "text-gray-500"
                                                  )}
                                             />

                                             <AiOutlineEdit size={25} className="text-gray-500" />
                                             <AiOutlineDelete size={25} className="text-gray-500" />
                                        </div>
                                   ),
                              },
                         ]}
                    />
               )}
          </Layout>
     );
};
