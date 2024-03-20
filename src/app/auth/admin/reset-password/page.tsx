"use client";
import React from "react";
import ResetPasswordRequest from "@/components/common/Auth/ResetPasswordRequest";

const page = () => {
  const apiResetPasswordAdmin: string = `admin/password-reset-request`;
  return <ResetPasswordRequest url={apiResetPasswordAdmin} typePage={"admin"} />;
};

export default page;
