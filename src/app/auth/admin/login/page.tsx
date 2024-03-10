"use client";
import React from "react";
import LogIn from "@/components/common/authCommon/LogIn";

const page = () => {
  const apiLoginAdmin: string = `admin/login`;
  const headersMethod: string = "!sing";

  return (
    <LogIn url={apiLoginAdmin} typeHeaders={headersMethod} pageType={"admin"} />
  );
};

export default page;
