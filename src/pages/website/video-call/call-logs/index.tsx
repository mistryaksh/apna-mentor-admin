import React, { useEffect } from "react";
import { Layout } from "../../../../layout";
import { useGetAllCallsQuery } from "../../../../app/api";
import { AppButton, AppInput, PageTitle } from "../../../../component";
import Table from "react-data-table-component";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ICategoryProps, IMentorProps } from "../../../../interface";

export const VideoCallsPage = () => {
  const {
    data: calls,
    isError: isCallsError,
    isFetching: isCallLoading,
    error: callError,
  } = useGetAllCallsQuery();

  useEffect(() => {
    if (isCallsError) {
      console.log(callError);
    }
  }, [isCallsError, callError]);

  return (
    <Layout pageTitle="Website call logs">
      <PageTitle
        title="Hey! admin manage your website calls"
        subTitle="Your website calls are listed here which is happened previously"
      />
      <div className="flex my-5 items-center gap-5">
        <AppInput type="search" placeholder="Search by user, mentor call id" />
        <AppButton primary>Search</AppButton>
      </div>
      {calls?.data?.length !== 0 && !isCallLoading && (
        <Table
          pagination
          data={calls?.data || []}
          columns={[
            {
              id: "#",
              name: "Sr No.",
              width: "100px",
              cell: (_, index) => <p>{index + 1}</p>,
            },
            {
              id: "users.user",
              name: "User Name",
              width: "250px",
              selector: ({ users }) => users.user.name.firstName,
              cell: ({ users }) => (
                <div>
                  {users?.user?.name ? (
                    <Link to={`/users/${users?.user?._id}`}>
                      <p className="capitalize underline text-gray-900">
                        {users?.user?.name?.firstName}{" "}
                        {users?.user?.name?.lastName}
                      </p>
                    </Link>
                  ) : (
                    <div>
                      <p className="text-gray-500">null</p>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "users.mentor",
              name: "Mentor",
              width: "250px",
              selector: ({ users }) => users.mentor.name.firstName,
              cell: ({ users }) => (
                <div>
                  {users?.mentor?.name ? (
                    <Link to={`/mentors/${users?.mentor?._id}`}>
                      <p className="capitalize underline text-gray-900">
                        {users?.mentor?.name?.firstName}{" "}
                        {users?.mentor?.name?.lastName}
                      </p>
                    </Link>
                  ) : (
                    <div>
                      <p className="text-gray-500">null</p>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "createdAt",
              name: "date / time",
              width: "200px",
              cell: ({ createdAt }) => (
                <p className="text-gray-500">
                  {moment(createdAt).format("Do MMM YYYY hh:mm A")}
                </p>
              ),
            },
            {
              id: "users.mentor.category",
              name: "category",
              width: "100px",
              selector: ({ users }) => users.mentor.name.firstName,
              cell: ({ users }) => (
                <p className="uppercase text-gray-500">
                  {(
                    (users.mentor as IMentorProps)?.category as ICategoryProps[]
                  )?.map((prop) => {
                    return prop.title;
                  })}
                </p>
              ),
            },
            {
              id: "sessionDetails.roomId",
              name: "call id",
              width: "180px",
              selector: ({ sessionDetails }) => sessionDetails.roomId,
              cell: ({ sessionDetails }) => (
                <p className="lowercase text-gray-500">
                  {sessionDetails.roomId}
                </p>
              ),
            },
            {
              id: "Call Type",
              name: "Call Type",
              width: "100px",
              selector: ({ sessionDetails }) => sessionDetails.callType,
            },
            {
              id: "status",
              name: "status",
              right: true,
              width: "200px",
              cell: ({ status }) => (
                <div>
                  <p className="uppercase text-gray-500">
                    {status === "ACCEPTED" && "on going"}
                  </p>
                  <p className="text-green-500 uppercase">
                    {status === "COMPLETED" && "completed"}
                  </p>
                  <p className="text-orange-500 uppercase">
                    {status === "PENDING" && "pending"}
                  </p>
                  <p className="text-primary-500 uppercase">
                    {status === "ONGOING" && "just started"}
                  </p>
                  <p className="text-red-500 uppercase">
                    {status === "REJECTED" && "rejected by mentor"}
                  </p>
                </div>
              ),
            },
          ]}
        />
      )}
      {isCallLoading && (
        <div className="h-[300px] flex flex-col justify-center gap-5 items-center">
          <AiOutlineLoading3Quarters
            size={150}
            className="animate-spin text-primary-500"
          />
          <p className="uppercase text-gray-500 animate-pulse">
            Getting call lists....
          </p>
        </div>
      )}
      {calls?.data.length === 0 && (
        <div>
          <p>No data for calls</p>
        </div>
      )}
    </Layout>
  );
};
