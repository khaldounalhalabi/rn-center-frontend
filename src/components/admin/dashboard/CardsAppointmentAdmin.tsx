"use client";
import Card from "@/components/common/ui/Card";
import React from "react";
import { AdminStatistics } from "@/Models/Statistics";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useTranslations } from "next-intl";

const CardsAppointmentAdmin = ({
  statisticsRes,
  isFetching,
  isLoading,
}: {
  statisticsRes: AdminStatistics | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const t = useTranslations("common.dashboard");

  return (
    <div className={"flex flex-col md:flex-row w-full"}>
      <Card className={'my-4 mx-0 md:m-4 bg-white rounded-2xl w-full'}>
        <div
          className={
            "flex w-full justify-between items-center gap-1"
          }
        >
          <div>{t("totalAppointments")}</div>
          <div>
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              statisticsRes?.total_appointments
            )}
          </div>
        </div>
      </Card>
      <Card className={'my-4 mx-0 md:m-4 bg-white rounded-2xl w-full'}>
        <div
          className={"flex justify-between items-center gap-1"}
        >
          <div>{t("nextAppointments")}</div>
          <div>
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              statisticsRes?.upcoming_appointments
            )}
          </div>
        </div>
      </Card>
      <Card className={'my-4 mx-0 md:m-4 bg-white rounded-2xl w-full'}>
        <div
          className={"flex justify-between items-center gap-1"}
        >
          <div>{t("todayAppointments")}</div>
          <div>
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              statisticsRes?.today_appointments
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardsAppointmentAdmin;