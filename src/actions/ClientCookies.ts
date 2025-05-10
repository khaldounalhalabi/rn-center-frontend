"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function setClientCookie(key: string, value: string) {
  return setCookie(key, value);
}

export function getClientCookie(key: string) {
  const coc: string | undefined = getCookie(key);
  return coc ? coc : "";
}

export function deleteClientCookie(key: string) {
  return deleteCookie(key);
}
