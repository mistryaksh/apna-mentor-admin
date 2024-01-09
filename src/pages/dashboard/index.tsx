import React from "react";
import { Layout } from "../../layout";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
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
               <div className="grid grid-cols-12 gap-5 mb-20">
                    <div className="col-span-12 xl:col-span-6 border-brandPrimary-500 rounded-md md:col-span-6  lg:col-span-6 sm:col-span-12">
                         <div className="border p-3">
                              <div className="flex items-center gap-3">
                                   <h6 className="text-2xl capitalize">recently joined doctors</h6>
                              </div>
                         </div>
                    </div>
               </div>
          </Layout>
     );
};
