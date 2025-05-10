"use server";
import { cookies } from "next/headers";

export async function setServerCookie(key: string, value: string) {
  return cookies().set(key, value);
}

export async function getCookieServer(
  key: string,
): Promise<string | undefined> {
  return cookies().get(key)?.value;
}

export async function deleteCookieServer(key: string) {
  return cookies().delete(key);
}
