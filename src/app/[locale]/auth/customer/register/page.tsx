import React from "react";
import RegisterCustomer from "@/components/common/Auth/Customer/RegisterCustomer";

const Page = () => {
    const url: string = `customer/register`;

  return <RegisterCustomer  url={url}/>;
};

export default Page;