import React from "react";
import LoginCustomer from "@/components/common/Auth/Customer/LoginCustomer";

const page = () => {
  const apiLoginAdmin: string = `customer/login`;

  return <LoginCustomer url={apiLoginAdmin}/>;
};

export default page;