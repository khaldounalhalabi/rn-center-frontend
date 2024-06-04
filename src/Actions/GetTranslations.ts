"use server";
import { getCookieServer } from "@/Actions/serverCookies";
import {
  getTranslations as getT,
  unstable_setRequestLocale,
} from "next-intl/server";

const getTranslations = async (key: string) => {
  const locale = (await getCookieServer("NEXT_LOCALE")) ?? "en";
  unstable_setRequestLocale(locale);
  return await getT(key);
};

export default getTranslations;
