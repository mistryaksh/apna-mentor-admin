import React from "react";
import { Layout } from "../../layout";
import { Link } from "react-router-dom";
import { useGetAllDoctorQuery } from "../../app/async-action";

export const DashboardPage = () => {
     const { data: allDoctors, isLoading: isAllDoctorLoading } = useGetAllDoctorQuery();
     return (
          <Layout pageTitle="Dashboard">
               <div className="grid grid-cols-12 gap-5  mt-24">
                    <div className="col-span-12 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
                         <p className="text-xl">Total Earnings</p>
                         <h6 className="text-2xl font-semibold">$ 500000000</h6>
                         <hr className="my-1" />
                         <div className="flex justify-between items-center mt-4">
                              <Link to="/payments">Details</Link>
                         </div>
                    </div>
                    <div className="col-span-12 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
                         <p className="text-xl">Withdrawal requests</p>
                         <h6 className="text-2xl font-semibold">100</h6>
                         <hr className="my-1" />
                         <div className="flex justify-between items-center mt-4">
                              <Link to="/payments">Details</Link>
                         </div>
                    </div>
                    <div className="col-span-12 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
                         <p className="text-xl">Verification Pending</p>
                         <h6 className="text-2xl font-semibold">500000000</h6>
                         <hr className="my-1" />
                         <div className="flex justify-between items-center mt-4">
                              <Link to="/payments">Details</Link>
                         </div>
                    </div>
                    <div className="col-span-12 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
                         <p className="text-xl">Current Online Users</p>
                         <h6 className="text-2xl font-semibold">$ 500000000</h6>
                         <hr className="my-1" />
                         <div className="flex justify-between items-center mt-4">
                              <Link to="/payments">Details</Link>
                         </div>
                    </div>
               </div>
               <hr className="my-5" />
               <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-6 border-brandPrimary-500 rounded-md md:col-span-6  lg:col-span-6 sm:col-span-12">
                         <div className="border p-3">
                              <div className="flex items-center gap-3">
                                   <h6 className="text-2xl capitalize">recently joined doctors</h6>
                              </div>
                              {isAllDoctorLoading && "Please wait"}
                              <div className="flex flex-col gap-3">
                                   {allDoctors?.data.map(({ name, workDetails }) => (
                                        <div
                                             key={name.firstName}
                                             className="flex gap-3 items-center bg-gray-100 p-3 rounded-lg mt-3"
                                        >
                                             <div className="w-[50px] h-[50px]">
                                                  <img
                                                       src="https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg"
                                                       alt={name.firstName}
                                                       className=" rounded-full"
                                                  />
                                             </div>
                                             <div>
                                                  <p className="capitalize">
                                                       {name.firstName} {name.lastName}
                                                  </p>
                                                  <p className="text-gray-500 capitalize">
                                                       {workDetails.hospital.name}
                                                  </p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
     );
};
