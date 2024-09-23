import React from "react";
import Login from "@/components/common/Auth/Login";

const page = () => {
  return <Login url={`admin/login`} pageType={"admin"} />;
};

export default page;
