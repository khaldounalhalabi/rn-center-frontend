"use server";
import { redirect } from "next/navigation";
import {getCookieServer} from "@/Actions/serverCookies";

export async function Navigate(url: string) {
  let locale = await getCookieServer("NEXT_LOCALE");
  if (url.startsWith("/")) {
    redirect(`/${locale}${url}`);
  } else redirect(url);
}