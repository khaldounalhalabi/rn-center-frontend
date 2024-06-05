"use server";
import { getCookieServer } from "@/Actions/serverCookies";

const TranslateServer = async (
  val: string | undefined | null,
  object?: boolean,
) => {
  if (!val && object) {
    return {
      en: "",
      ar: "",
    };
  }

  if (!val && !object) {
    return "";
  }
  const locale = (await getCookieServer("NEXT_LOCALE")) ?? "en";
  const tr = JSON.parse(val ?? "{}");
  if (val && !object) {
    if (locale == "en") {
      return tr.en;
    } else {
      return tr.ar;
    }
  } else if (val && object) {
    return tr;
  }
};
export default TranslateServer;
