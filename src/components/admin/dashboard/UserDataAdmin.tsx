"use client";
import { AdminStatistics } from "@/Models/Statistics";
import { User } from "@/Models/User";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import RoundedImage from "@/components/common/RoundedImage";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ArrowRight from "@/components/icons/ArrowRight";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

const UserDataAdmin = ({
  statisticsRes,
  isLoading,
  isFetching,
}: {
  statisticsRes: AdminStatistics | undefined;
  isLoading: boolean;
  isFetching: boolean;
}) => {
  const user: User = HandleGetUserData();
  const t = useTranslations("common.dashboard");
  const thisMonth = Number(statisticsRes?.total_deductions_current_month ?? 0);
  const lastMonth = Number(statisticsRes?.total_deductions_prev_month ?? 0);

  function calculatePercentageChange(
    incomeLastMonth: number,
    incomeThisMonth: number,
  ): number {
    if (incomeLastMonth === 0 && incomeThisMonth === 0) {
      return 0;
    } else if (incomeLastMonth === 0 && incomeThisMonth < 0) {
      return -100;
    } else if (incomeLastMonth === 0 && incomeThisMonth > 0) {
      return 100;
    } else if (incomeThisMonth === 0 && incomeLastMonth < 0) {
      return 100;
    } else if (incomeThisMonth === 0 && incomeLastMonth > 0) {
      return -100;
    } else if (incomeThisMonth < 0 && incomeLastMonth < 0) {
      return (
        ((incomeThisMonth - incomeLastMonth) / Math.abs(incomeLastMonth)) * 100
      );
    } else if (incomeThisMonth > 0 && incomeLastMonth > 0) {
      return ((incomeThisMonth - incomeLastMonth) / incomeLastMonth) * 100;
    } else if (incomeThisMonth < 0 && incomeLastMonth > 0) {
      return ((incomeThisMonth - incomeLastMonth) / incomeLastMonth) * 100;
    } else if (incomeThisMonth > 0 && incomeLastMonth < 0) {
      return (
        ((incomeThisMonth - incomeLastMonth) / Math.abs(incomeLastMonth)) * 100
      );
    }
    return 0;
  }

  const calc = calculatePercentageChange(
    Number(lastMonth ?? 0),
    Number(thisMonth ?? 0),
  );
  const local = useLocale();

  return (
    <>
      <div className="w-full min-h-[230px] flex flex-col rounded-2xl relative">
        <div className="h-1/2 bg-[#1fb8b9] text-white p-4 rounded-t-xl">
          <h2 className="text-lg md:text-xl font-semibold">
            {t("welcomeBack")} !
          </h2>
          <p className="text-sm md:text-base mb-4">{t("dashBoard")}</p>
        </div>

        <div className="h-1/2 flex flex-col justify-between  xl:items-end bg-white rounded-b-xl">
          <div className="p-4 w-full ">
            <div
              className={`relative z-10 p-1 bg-white w-16 h-16 rounded-full -top-[40px] left-[10%] ${local == "en" ? "left-[10%]" : "right-[10%]"}`}
            >
              <RoundedImage
                src={user.image?.[0]?.file_url ?? "/user.png"}
                alt={"user-profile"}
                className="w-full h-full"
              />
            </div>
            <h2 className="text-lg lg:text-xl md:text-lg font-semibold">
              {TranslateClient(user.first_name)}{" "}
              {TranslateClient(user.middle_name)}{" "}
              {TranslateClient(user.last_name)}
            </h2>
            <p className="text-sm md:text-base">{user.email}</p>
          </div>
          <hr className={"w-full"} />
          <div className="p-4 w-full gap-2 flex justify-between">
            <div className={"w-1/2"}>
              <h2>
                {t("totalActiveDoctors")}{" "}
                <p>
                  {" "}
                  {isLoading || isFetching ? (
                    <LoadingSpin />
                  ) : (
                    statisticsRes?.total_active_doctors
                  )}
                </p>
              </h2>
              <h2>
                {t("todayAppointments")}{" "}
                <p>
                  {" "}
                  {isLoading || isFetching ? (
                    <LoadingSpin />
                  ) : (
                    statisticsRes?.today_appointments
                  )}
                </p>
              </h2>
            </div>
            <div className={"w-1/2"}>
              <h2>
                {t("totalPatients")}{" "}
                <p>
                  {" "}
                  {isLoading || isFetching ? (
                    <LoadingSpin />
                  ) : (
                    statisticsRes?.total_patients
                  )}
                </p>
              </h2>
              <h2>
                {t("todayRegisteredPatients")}{" "}
                <p>
                  {" "}
                  {isLoading || isFetching ? (
                    <LoadingSpin />
                  ) : (
                    statisticsRes?.today_registered_patients
                  )}
                </p>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 h-[140px] card bg-base-100 p-4">
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                {t("monthlyEarning")} !
              </h2>
              <p className="text-sm md:text-base">{t("thisMonth")}</p>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">
              {isLoading || isFetching ? (
                <LoadingSpin />
              ) : (
                (statisticsRes?.total_deductions_current_month ?? 0)
                  .toFixed(2)
                  .toLocaleString()
              )}{" "}
              IQD
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              <>
                {" "}
                {calc < 0 ? (
                  <span className="text-error flex items-center">
                    {calc}% <ArrowRight className="w-4 h-6 -rotate-90" />
                  </span>
                ) : calc > 0 ? (
                  <span className="flex items-center text-green-500">
                    {calc}% <ArrowRight className="w-4 h-6 rotate-90" />
                  </span>
                ) : (
                  <span>{calc}%</span>
                )}
              </>
            )}
            <p className="text-sm md:text-base">{t("fromPreviousMonth")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDataAdmin;
