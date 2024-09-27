"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function setCookieClient(key: string, value: string) {
  return setCookie(key, value);
}

export function getCookieClient(key: string) {
  const coc: string | undefined = getCookie(key);
  return coc ? coc : "";
}




export function deleteCookieClient(key: string) {
  return deleteCookie(key);
}
