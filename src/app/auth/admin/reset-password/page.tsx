"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordAdmin: string = `admin/password-reset-request`;
  return <ResetPassword url={apiResetPasswordAdmin} typePage={"admin"} />;
};

export default page;
