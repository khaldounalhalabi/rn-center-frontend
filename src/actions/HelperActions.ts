"use server";
import {
  deleteServerCookie,
  getServerCookie,
  setServerCookie,
} from "@/actions/ServerCookies";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";

export async function setToken(token?: string, refreshToken?: string) {
  await setServerCookie("token", token ?? "");
  await setServerCookie("refresh_token", refreshToken ?? "");
}

export async function getToken(): Promise<string | undefined> {
  return (await getServerCookie("token")) as string | undefined;
}

export async function deleteTokens() {
  await deleteServerCookie("token");
  await deleteServerCookie("refresh_token");
}

export async function setRole(role?: string) {
  await setServerCookie("role", role ?? "");
}

export async function getRole(): Promise<RoleEnum | undefined> {
  return (await getServerCookie("role")) as RoleEnum | undefined;
}

export async function deleteRole() {
  await deleteServerCookie("role");
}

export async function setOtp(code?: string) {
  await setServerCookie("otp_code", code ?? "");
}

export async function getOtp(): Promise<string | undefined> {
  const otp = await getServerCookie("otp_code");
  await deleteServerCookie("otp_code");
  return otp;
}

export async function setPhone(phone?: string) {
  if (!phone) {
    deleteServerCookie("phone");
  } else {
    await setServerCookie("phone", phone ?? "");
  }
}

export async function getPhone(): Promise<string | undefined> {
  return await getServerCookie("phone");
}

export async function setUser(user?: User) {
  if (user) {
    await setServerCookie("user_cookies_key", JSON.stringify(user));
  }
}

export async function getUser(): Promise<User | undefined> {
  const user = await getServerCookie("user_cookies_key");
  return user ? JSON.parse(user) : undefined;
}

export async function deleteUser() {
  await deleteServerCookie("user_cookies_key");
}
