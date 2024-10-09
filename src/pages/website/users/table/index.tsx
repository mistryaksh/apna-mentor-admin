import React, { useEffect } from "react";

import { Layout } from "../../../../layout";
import { useGetAllUserQuery } from "../../../../app/api";
import { PageTitle } from "../../../../component";
import {
  AiOutlineLoading,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { LiaUserTimesSolid, LiaUserCheckSolid } from "react-icons/lia";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import DataTable from "react-data-table-component";

export const UsersPage = () => {
  const {
    isError: isUsersError,
    error: usersError,
    isLoading: isUsersLoading,
    data: usersData,
  } = useGetAllUserQuery();

  useEffect(() => {
    if (isUsersError) {
      console.log(usersError);
    }
  }, [isUsersError, usersError, usersData]);

  return (
    <Layout pageTitle="Manage Users">
      <div>
        <PageTitle
          title={`Manage Users`}
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, distinctio."
        />
      </div>
      {isUsersLoading && (
        <div className="flex justify-center flex-col items-center gap-4">
          <AiOutlineLoading
            size={150}
            className="animate-spin text-primary-500"
          />
          <p className="text-gray-500 font-mono">Users are loading....</p>
        </div>
      )}
      {!isUsersLoading && usersData?.data.length !== 0 && (
        <DataTable
          pagination
          paginationPerPage={20}
          data={usersData?.data || []}
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
              cell: ({ name }) => (
                <div className="py-2">
                  <p className="text-md capitalize">
                    {name?.firstName} {name?.lastName}
                  </p>
                </div>
              ),
            },
            {
              id: "#",
              name: "Contact Details",
              cell: ({ email, mobile }) => (
                <div>
                  <div className="flex items-center gap-3">
                    <AiOutlineMail size={18} className="text-gray-500" />
                    <p className="text-md text-md text-gray-500">{email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <AiOutlinePhone size={18} className="text-gray-500" />
                    <p className="text-md capitalize text-md text-gray-500">
                      {mobile}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              id: "#",
              name: "Verified",
              width: "5rem",
              right: true,
              cell: ({ verified }) => (
                <div>
                  {verified ? (
                    <LiaUserCheckSolid size={25} className="text-green-500" />
                  ) : (
                    <LiaUserTimesSolid size={25} className="text-red-500" />
                  )}
                </div>
              ),
            },
            {
              id: "#",
              name: "Block",
              right: true,
              width: "5rem",
              cell: ({ block }) => (
                <div>
                  {block ? (
                    <div className="flex items-center gap-3">
                      <MdOutlineBlock size={25} className="text-red-500" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <CgUnblock size={25} className="text-green-500" />
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "#",
              name: "Online",
              width: "5rem",
              right: true,
              cell: ({ online }) => (
                <div>
                  {online ? (
                    <p className="text-green-500">Online</p>
                  ) : (
                    <p className="text-red-500">Offline</p>
                  )}
                </div>
              ),
            },
            {
              id: "#",
              right: true,
              name: "Created At",
              cell: ({ createdAt }) => (
                <div className="flex gap-5 items-center">
                  <p className="text-md capitalize text-md text-gray-500">
                    {new Date(createdAt as any).toDateString()}
                  </p>
                </div>
              ),
            },
          ]}
        />
      )}
    </Layout>
  );
};
