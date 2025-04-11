"use server";
import { NextRequest } from "next/server";
import { RoleEnum } from "@/enum/RoleEnum";
import { getRole, getToken } from "@/Actions/HelperActions";
import { getCookieServer } from "@/Actions/serverCookies";

export const authMiddleware = async (request: NextRequest) => {
  const path = `${request.nextUrl.pathname}`;
  let access = {
    canAccessAdmin: true,
    canAccessCustomer: true,
    canAccessDoctor: true,
    canAccessSecretary: true,
  };

  if (await hasAccessToThisUrl(path, RoleEnum.ADMIN)) {
    access.canAccessAdmin = false;
  }

  if (await hasAccessToThisUrl(path, RoleEnum.SECRETARY)) {
    access.canAccessSecretary = false;
  }

  if (await hasAccessToThisUrl(path, RoleEnum.DOCTOR)) {
    access.canAccessDoctor = false;
  }

  if (await hasAccessToThisUrl(path, RoleEnum.CUSTOMER)) {
    access.canAccessCustomer = false;
  }

  return access;
};

const hasAccessToThisUrl = async (url: string, role: RoleEnum) => {
  const locale = getCookieServer("NEXT_LOCALE");
  const userRole = await getRole();
  const token = getToken();

  return url.includes(`${locale}/${role}`) && userRole != role && token;
};
