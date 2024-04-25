"use server";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

export async function navigate(url: string) {
  if (url.startsWith("/")) {
    redirect(`/${useLocale()}${url}`);
  } else redirect(url);
}
