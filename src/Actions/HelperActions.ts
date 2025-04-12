"use server";
import {
  deleteCookieServer,
  getCookieServer,
  setServerCookie,
} from "@/Actions/serverCookies";
import { RoleEnum } from "@/enum/RoleEnum";

export async function setToken(token?: string, refreshToken?: string) {
  await setServerCookie("token", token ?? "");
  await setServerCookie("refresh_token", refreshToken ?? "");
}

export async function getToken(): Promise<string | undefined> {
  return (await getCookieServer("token")) as string | undefined;
}

export async function deleteTokens() {
  await deleteCookieServer("token");
  await deleteCookieServer("refresh_token");
}

export async function setRole(role?: string) {
  await setServerCookie("role", role ?? "");
}

export async function getRole(): Promise<RoleEnum | undefined> {
  return (await getCookieServer("role")) as RoleEnum | undefined;
}

export async function deleteRole() {
  await deleteCookieServer("role");
}

export async function setOtp(code?: string) {
  await setServerCookie("otp_code", code ?? "");
}

export async function getOtp(): Promise<string | undefined> {
  const otp = await getCookieServer("otp_code");
  await deleteCookieServer("otp_code");
  return otp;
}

export async function setPhone(phone?: string) {
  await setServerCookie("phone", phone ?? "");
}

export async function getPhone(): Promise<string | undefined> {
  const phone = await getCookieServer("phone");
  await deleteCookieServer("phone");
  return phone;
}
