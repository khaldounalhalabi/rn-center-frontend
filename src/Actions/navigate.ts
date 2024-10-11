"use server";
import { redirect } from "next/navigation";
import {getLocale} from "next-intl/server";

export async function Navigate(url: string) {
  let locale = await getLocale();
  if (url.startsWith("/")) {
    redirect(`/${locale}${url}`);
  } else redirect(url);
}