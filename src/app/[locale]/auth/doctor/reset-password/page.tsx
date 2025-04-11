"use client";
import React from "react";
import ResetPasswordRequest from "@/components/common/Auth/ResetPasswordRequest";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <ResetPasswordRequest role={RoleEnum.ADMIN} />;
};

export default page;
