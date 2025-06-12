"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function setClientCookie(key: string, value: string) {
  return setCookie(key, value);
}

export function getClientCookie(key: string): string | undefined {
  return getCookie(key);
}

export function deleteClientCookie(key: string) {
  return deleteCookie(key);
}
