"use server";
import { redirect } from "next/navigation";
import { getServerCookie } from "@/actions/ServerCookies";

export async function Navigate(url: string) {
  let locale = await getServerCookie("NEXT_LOCALE");
  if (url.startsWith("/")) {
    redirect(`/${locale}${url}`);
  } else redirect(url);
}
