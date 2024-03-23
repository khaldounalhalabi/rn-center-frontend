import React from "react";
import LogIn from "@/components/common/Auth/LogIn";

const page = () => {
  const apiLoginAdmin: string = `customer/login`;

  return <LogIn url={apiLoginAdmin} pageType={"customer"} />;
};

export default page;
