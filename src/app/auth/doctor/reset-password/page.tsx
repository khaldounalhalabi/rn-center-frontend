"use client";
import React from "react";
import ResetPasswordRequest from "@/components/common/Auth/ResetPasswordRequest";

const page = () => {
  const apiResetPasswordDoctor: string = `doctor/password-reset-request`;
  return <ResetPasswordRequest url={apiResetPasswordDoctor} typePage={"doctor"} />;
};

export default page;
