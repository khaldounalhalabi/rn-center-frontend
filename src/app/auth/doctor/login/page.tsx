"use client";
import React from "react";
import Login from "@/components/common/Auth/Login";

const page = () => {
  const apiLoginAdmin: string = `doctor/login`;

  return <Login url={apiLoginAdmin} pageType={"doctor"} />;
};

export default page;
