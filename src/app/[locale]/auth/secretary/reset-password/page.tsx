import React from "react";
import ResetPasswordRequest from "@/components/common/auth/ResetPasswordRequest";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <ResetPasswordRequest role={RoleEnum.SECRETARY} />;
};

export default page;
