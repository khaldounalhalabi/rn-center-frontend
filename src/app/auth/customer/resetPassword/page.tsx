"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordCustomer: string = `${process.env.localApi}customer/password-reset-request`;
  const headersMethod: string = "!sing";
  return (
    <ResetPassword
      url={apiResetPasswordCustomer}
      typeHeaders={headersMethod}
      typePage={"customer"}
    />
  );
};

export default page;
