"use client";
import React from "react";
import LogIn from "@/components/common/authCommon/LogIn";

const page = () => {
  const apiLoginAdmin: string = `doctor/login`;

  return <LogIn url={apiLoginAdmin} pageType={"doctor"} />;
};

export default page;
