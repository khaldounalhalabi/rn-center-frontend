"use client";
import React from "react";
import LogIn from "@/components/common/authCommon/LogIn";

const page = () => {
  const apiLoginAdmin: string = `${process.env.localApi}customer/login`;
  const headersMethod: string = "!sing";

  return (
    <LogIn
      url={apiLoginAdmin}
      typeHeaders={headersMethod}
      pageType={"customer"}
    />
  );
};

export default page;
