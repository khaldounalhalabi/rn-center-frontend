"use client";
import React from "react";
import ResetPasswordRequest from "@/components/common/Auth/ResetPasswordRequest";

const page = () => {
  const apiResetPasswordCustomer: string = `customer/password-reset-request`;
  return (
    <ResetPasswordRequest
      url={apiResetPasswordCustomer}
      typePage={"customer"}
    />
  );
};

export default page;
