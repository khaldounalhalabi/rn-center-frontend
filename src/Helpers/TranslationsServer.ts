"use server";
import { getLocale, getTranslations } from "next-intl/server";

const TranslateServer = async (
  val: string | undefined | null,
  object?: boolean,
) => {
  const locale = await getLocale();
  const noData = `{"en":"No Data","ar":"لا يوجد بيانات"}`;
  const noDataObj = JSON.parse(noData ?? "{}");

  if (!val && object) {
    return await noDataObj;
  }

  if (!val && !object) {
    if (locale == "en") {
      return await noDataObj.en;
    } else {
      return await noDataObj.ar;
    }
  }
  const tr = await JSON.parse(val ?? "{}");
  if (val && !object) {
    if (locale == "en") {
      if (tr.en) {
        return await (tr.en.trim() != "" ? tr.en : tr.ar ?? "");
      } else {
        return await (tr.ar ?? "");
      }
    } else {
      if (tr.ar) {
        return await (tr.ar.trim() != "" ? tr.ar : tr.en ?? "");
      } else {
        return await (tr.en ?? "");
      }
    }
  } else if (val && object) {
    return await tr;
  }
};
export default TranslateServer;

export const TranslateStatusOrTypeServer = async (value?: string) => {
  if (!value) {
    return "";
  }
  const t = await getTranslations("types_statuses");

  return t(value as any);
};
