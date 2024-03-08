"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordAdmin: string = `${process.env.localApi}admin/password-reset-request`;
  const headersMethod: string = "!sing";
  return (
    <ResetPassword
      url={apiResetPasswordAdmin}
      typeHeaders={headersMethod}
      typePage={"admin"}
    />
  );
};

export default page;
