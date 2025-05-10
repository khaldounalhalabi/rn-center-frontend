"use server";
import { NextRequest } from "next/server";
import { RoleEnum } from "@/enum/RoleEnum";
import { getRole, getToken } from "@/actions/HelperActions";
import { getServerCookie } from "@/actions/ServerCookies";

export const authMiddleware = async (request: NextRequest) => {
  const path = `${request.nextUrl.pathname}`;
  let access = {
    canAccessAdmin: true,
    canAccessCustomer: true,
    canAccessDoctor: true,
    canAccessSecretary: true,
  };

  if (await cannotAccessUrl(path, RoleEnum.ADMIN)) {
    access.canAccessAdmin = false;
  }

  if (await cannotAccessUrl(path, RoleEnum.SECRETARY)) {
    access.canAccessSecretary = false;
  }

  if (await cannotAccessUrl(path, RoleEnum.DOCTOR)) {
    access.canAccessDoctor = false;
  }

  if (await cannotAccessUrl(path, RoleEnum.CUSTOMER)) {
    access.canAccessCustomer = false;
  }

  return access;
};

const cannotAccessUrl = async (url: string, role: RoleEnum) => {
  const locale = await getServerCookie("NEXT_LOCALE");
  const userRole = await getRole();
  const token = await getToken();
  return url.includes(`${locale}/${role}`) && (userRole != role || !token);
};
