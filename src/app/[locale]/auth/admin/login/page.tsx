import React from "react";
import Login from "@/components/common/Auth/Login";

const page = () => {
  const apiLoginAdmin: string = `admin/login`;

  return <Login url={apiLoginAdmin} pageType={"admin"} />;
};

export default page;
