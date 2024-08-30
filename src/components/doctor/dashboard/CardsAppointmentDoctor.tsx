"use client";
import Card from "@/components/common/ui/Card";
import React from "react";
import { Statistics } from "@/Models/Statistics";
import LoadingSpin from "@/components/icons/LoadingSpin";
import {useTranslations} from "next-intl";

const CardsAppointmentDoctor = ({
  statisticsRes,
  isFetching,
  isLoading,
}: {
  statisticsRes: Statistics | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const t = useTranslations("common.dashboard")

  return (
    <div className={"flex pl-4 md:pl-0 flex-wrap mb-6 gap-5"}>
      <Card>
        <div
          className={
            "flex w-full justify-between gap-4 items-center min-w-[210px]"
          }
        >
          <div className={"flex flex-col justify-between "}>
            <p>{t("totalAppointments")}</p>
            <p>
              {isLoading || isFetching ? (
                <LoadingSpin />
              ) : (
                statisticsRes?.total_appointments
              )}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div
          className={"flex justify-between gap-4 items-center min-w-[210px]"}
        >
          <div className={"flex flex-col justify-between "}>
            <p>{t("todayAppointments")}</p>
            <p>
              {isLoading || isFetching ? (
                <LoadingSpin />
              ) : (
                statisticsRes?.today_appointments
              )}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div
          className={"flex justify-between gap-4 items-center min-w-[210px]"}
        >
          <div className={"flex flex-col justify-between "}>
            <p>{t("nextAppointments")}</p>
            <p>
              {isLoading || isFetching ? (
                <LoadingSpin />
              ) : (
                statisticsRes?.upcoming_appointments
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardsAppointmentDoctor;