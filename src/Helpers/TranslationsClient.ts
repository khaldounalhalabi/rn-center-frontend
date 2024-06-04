import { getCookieServer } from "@/Actions/serverCookies";
import { Translatable } from "@/Models/Translatable";
import {getCookieClient} from "@/Actions/clientCookies";

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

    if (typeof window == "undefined") {
      getCookieServer("NEXT_LOCALE").then((lang) => {
        locale = lang ?? "en";
      });
    } else {
      locale = getCookieClient("NEXT_LOCALE") ?? "en";
    }

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