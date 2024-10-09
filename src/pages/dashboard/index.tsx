import React from "react";
import { Layout } from "../../layout";
import { Link } from "react-router-dom";
import { useGetAllMentorQuery, useGetAllUserQuery } from "../../app/api";

export const DashboardPage = () => {
  const { data: user } = useGetAllUserQuery();
  const { data: mentor } = useGetAllMentorQuery();
  return (
    <Layout pageTitle="Dashboard">
      <div className="grid grid-cols-12 gap-5  mt-24">
        <div className="col-span-12 bg-gray-100 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
          <p className="text-xl">User Engagement</p>
          <h6 className="text-2xl font-semibold">{user?.data.length}</h6>
          <hr className="my-1" />
          <div className="flex justify-between items-center mt-4">
            <Link to="/users/manage">Details</Link>
          </div>
        </div>
        <div className="col-span-12 bg-gray-100 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
          <p className="text-xl">Mentor Registered</p>
          <h6 className="text-2xl font-semibold">{mentor?.data.length}</h6>
          <hr className="my-1" />
          <div className="flex justify-between items-center mt-4">
            <Link to="/mentors/manage">Details</Link>
          </div>
        </div>
        <div className="col-span-12 bg-gray-100 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
          <p className="text-xl">Verified Mentors</p>
          <h6 className="text-2xl font-semibold">
            {
              mentor?.data.filter(
                (mentor) => mentor.accountStatus.verification === true
              ).length
            }
          </h6>
          <hr className="my-1" />
          <div className="flex justify-between items-center mt-4">
            <Link to="/users/manage">Details</Link>
          </div>
        </div>
        <div className="col-span-12 bg-gray-100 xl:col-span-3 border-brandPrimary-500 rounded-lg p-3 hover:shadow-xl">
          <p className="text-xl">Current Online Users</p>
          <h6 className="text-2xl font-semibold">{}</h6>
          <hr className="my-1" />
          <div className="flex justify-between items-center mt-4">
            <Link to="/users">Details</Link>
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
