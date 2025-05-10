import React from "react";
import Login from "@/components/common/auth/Login";
import { RoleEnum } from "@/enums/RoleEnum";

const page = () => {
  return <Login role={RoleEnum.ADMIN} />;
};

export default page;
