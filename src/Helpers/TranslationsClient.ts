"use client";
import { Translatable } from "@/Models/Translatable";
import { getCookieClient } from "@/actions/ClientCookies";
import { useTranslations } from "next-intl";

export function TranslateClient(
  val: string | undefined | null,
  object?: boolean,
): string;

export function TranslateClient(
  val: string | undefined | null,
  object: true,
): Translatable;

export function TranslateClient(
  val: string | undefined | null,
  object = false,
): string | Translatable {
  try {
    if (!val && object) {
      return {
        en: "",
        ar: "",
      };
    } else if (!val && !object) {
      return "";
    }
    const tr = JSON.parse(val ?? "{}");
    if (object) {
      return tr;
    }
    let locale = "en";
    locale = getCookieClient("NEXT_LOCALE") ?? "en";
    if (locale == "en") {
      if (tr.en) {
        return tr.en.trim() != "" ? tr.en : tr.ar ?? "";
      } else {
        return tr.ar ?? "";
      }
    } else {
      if (tr.ar) {
        return tr.ar.trim() != "" ? tr.ar : tr.en ?? "";
      } else {
        return tr.en ?? "";
      }
    }
  } catch (e) {
    if (object) {
      return {
        en: val ?? "",
        ar: val ?? "",
      };
    }
    return val ?? "";
  }
}

export const TranslateStatusOrTypeClient = (value?: string) => {
  const t = useTranslations("types_statuses");
  if (!value) {
    return "";
  }
  return t(value as any);
};
