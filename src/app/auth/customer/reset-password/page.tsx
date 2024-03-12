"use client";
import React from "react";
import ResetPassword from "@/components/common/authCommon/ResetPassword";

const page = () => {
  const apiResetPasswordCustomer: string = `customer/password-reset-request`;
  return <ResetPassword url={apiResetPasswordCustomer} typePage={"customer"} />;
};

export default page;
