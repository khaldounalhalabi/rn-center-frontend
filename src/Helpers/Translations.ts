import { getCookieClient } from "@/Actions/clientCookies";
import { getCookieServer } from "@/Actions/serverCookies";
import { Translatable } from "@/Models/Translatable";
import { useLocale } from "next-intl";

export function translate(
  val: string | undefined | null,
  object?: boolean
): string;

export function translate(
  val: string | undefined | null,
  object: true
): Translatable;

export function translate(
  val: string | undefined | null,
  object = false
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
    let locale = getCookieClient("NEXT_LOCALE") ?? "en";

    if (locale == "en") {
      return tr.en ?? "";
    } else return tr.ar ?? "";
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
