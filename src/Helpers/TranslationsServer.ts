"use server";
import { getCookieServer } from "@/Actions/serverCookies";

const TranslateServer = async (
  val: string | undefined | null,
  object?: boolean,
) => {
  const locale = (await getCookieServer("NEXT_LOCALE")) ?? "en";

  const noData = `{"en":"No Data","ar":"لا يوجد بيانات"}`;
  const noDataObj = JSON.parse(noData ?? "{}");

  if (!val && object) {
    return noDataObj
  }

  if (!val && !object) {
    if (locale == "en") {
      return noDataObj.en;
    } else {
      return noDataObj.ar;
    }
  }
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