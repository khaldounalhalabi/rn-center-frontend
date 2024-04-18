import React from "react";
import Login from "@/components/common/Auth/Login";

const page = () => {
  const apiLoginAdmin: string = `customer/login`;

  return <Login url={apiLoginAdmin} pageType={"customer"} />;
};

export default page;
