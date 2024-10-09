import React from "react";
import { Layout } from "../../layout";
import { useGetWalletQuery } from "../../app/api";
import { IUserProps } from "../../interface/user.interface";

export const PaymentPage = () => {
  const { data } = useGetWalletQuery();
  return (
    <Layout pageTitle="Payment / Wallet of users">
      <div className="my-5">
        <h6 className="text-2xl font-semibold">User Wallets</h6>
      </div>
      <div className="grid xl:lg:grid-cols-3 my-5 md:grid-cols-6 xs:grid-cols-12 sm:grid-cols-12 gap-3">
        {data?.data.map(({ balance, userId }) => (
          <div className="bg-gray-100 p-3 border rounded-md">
            <h6 className="capitalize">
              {(userId as IUserProps)?.name?.firstName}{" "}
              {(userId as IUserProps)?.name?.lastName}
            </h6>
            <p>
              {balance.toLocaleString("en", {
                notation: "standard",
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};
