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
      return await tr.en;
    } else {
      return await tr.ar;
    }
  } else if (val && object) {
     return await tr;
  }
};
export default TranslateServer;