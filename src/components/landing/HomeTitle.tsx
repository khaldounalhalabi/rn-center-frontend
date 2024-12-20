import React from "react";
import LogoHoverIcon from "@/components/icons/LogoHoverIcon";
import { getTranslations } from "next-intl/server";

export const HomeTitle = async () => {
  const t = await getTranslations("landing");

  return (
    <div
      className={
        "text-[#013567] text-[30px] lg:text-[30px] font-bold md:text-[25px] 2xl:text-[35px]  group"
      }
      id={"home-title"}
    >
      <h2>{t("get_control_over")}</h2>
      <h2>{t("over_your_clinic")}</h2>
      <h2 className={""}>
        {t("with")}{" "}
        <span className={"text-[#1FB8B9] relative"}>
          {t("pom")}
          <span
            className={
              "absolute top-0 ltr:-right-5 rtl:-left-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            }
          >
            <LogoHoverIcon />
          </span>
        </span>
      </h2>
    </div>
  );
};
