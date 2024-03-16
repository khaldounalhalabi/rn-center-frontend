"use client";
import React from "react";
import LogIn from "@/components/common/Auth/LogIn";

const page = () => {
  const apiLoginAdmin: string = `admin/login`;

  return <LogIn url={apiLoginAdmin} pageType={"admin"} />;
};

export default page;
