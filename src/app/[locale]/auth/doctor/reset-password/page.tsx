"use client";
import React from "react";
import ResetPasswordRequest from "@/components/common/auth/ResetPasswordRequest";
import { RoleEnum } from "@/enums/RoleEnum";

const page = () => {
  return <ResetPasswordRequest role={RoleEnum.DOCTOR} />;
};

export default page;
