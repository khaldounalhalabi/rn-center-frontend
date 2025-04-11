"use client";
import React from "react";
import Login from "@/components/common/Auth/Login";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  const apiLoginAdmin: string = `doctor/login`;

  return <Login role={RoleEnum.DOCTOR} />;
};

export default page;
