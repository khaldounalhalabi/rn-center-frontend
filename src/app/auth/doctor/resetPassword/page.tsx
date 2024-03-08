"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordDoctor: string = `${process.env.localApi}doctor/password-reset-request`;
  const headersMethod: string = "!sing";
  return (
    <ResetPassword
      url={apiResetPasswordDoctor}
      typeHeaders={headersMethod}
      typePage={"doctor"}
    />
  );
};

export default page;
