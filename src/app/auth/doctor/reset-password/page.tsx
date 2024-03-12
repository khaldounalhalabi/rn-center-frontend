"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordDoctor: string = `doctor/password-reset-request`;
  return <ResetPassword url={apiResetPasswordDoctor} typePage={"doctor"} />;
};

export default page;
