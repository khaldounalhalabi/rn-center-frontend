import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";
import { StatisticService } from "@/services/StatisticService";
import { StatisticsPublic } from "@/Models/Statistics";
import Link from "next/link";
import { HomeTitle } from "@/components/landing/HomeTitle";
import { getTranslations } from "next-intl/server";

const Title = async () => {
  const data = await StatisticService.make<StatisticService>().getStatistics();
  const res: StatisticsPublic | undefined = data?.data;
  const t = await getTranslations("landing");
  return (
    <>
      <div id={"home"} className={"flex flex-col items-start px-5 md:px-0"}>
        <HomeTitle />
        <div
          className={`max-w-[65%] text-wrap opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] mt-8`}
        >
          <p className="text-[#6685A3] rtl:leading-loose">
            {t("give_full_control")} {" "}
            {t("your_clinics_operations")} {" "}
            {t("from_appointments_to_invoicing")}. {" "}
            {t("start_free_trial")} {t("how_easy")} {" "}
          </p>
        </div>
        <Link href={"/#start"} className={"mt-12"}>
          <AuthSubmitButton>{t("get_started")}</AuthSubmitButton>
        </Link>
        <div
          className={
            "w-full flex justify-between md:justify-start gap-5 items-center mt-12"
          }
        >
          <div
            className={
              "max-w-[180px] w-1/3 md:w-[25%] h-[125px] rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
            }
          >
            <h2
              className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}
            >
              {/* {res?.clinics_count} */}
              5K
            </h2>
            <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
              {t("clinic")}
            </h2>
          </div>
          <div
            className={
              "max-w-[180px] w-1/3 md:w-[25%] h-[125px] rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
            }
          >
            <h2
              className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}
            >
              {/* {res?.success_appointments_count}% */}
              32.2K
            </h2>
            <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
              {t("appointments")}
            </h2>
          </div>
          <div
            className={
              "max-w-[180px] w-1/3 md:w-[25%] h-[125px]  rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
            }
          >
            <h2
              className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}
            >
              99%
            </h2>
            <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
              {t("ratings")}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
