"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/common/ui/Card";
import { StatisticService } from "@/services/StatisticService";
import ChartDashboardDoctor from "@/components/doctor/dashboard/ChartDashboardDoctor";
import { Statistics } from "@/Models/Statistics";
import UserDataDoctor from "@/components/doctor/dashboard/UserDataDoctor";
import CardsAppointmentDoctor from "@/components/doctor/dashboard/CardsAppointmentDoctor";
import TableTodayAppointment from "@/components/doctor/dashboard/tableTodayAppointment";
import { useTranslations } from "next-intl";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";

const Home = () => {
  const clinic = HandleGetUserData();

  const {
    data: statistics,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      return await StatisticService.make<StatisticService>(
        "doctor",
      ).doctorIndexPageStatistics();
    },
  });
  const statisticsRes: Statistics | undefined = statistics?.data;
  const t = useTranslations("common.dashboard");
  console.log(clinic);
  return (
    <>
      <div className={"flex flex-col justify-between md:flex-row my-6"}>
        <div className="md:w-[40%] w-full px-4">
          <UserDataDoctor
            statisticsRes={statisticsRes}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>

        <div className={"px-4 w-full"}>
          <CardsAppointmentDoctor
            statisticsRes={statisticsRes}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Card className={"my-4 mx-0 md:m-4 bg-white rounded-2xl"}>
            <div className={"flex justify-between"}>
              <h2 className={"card-title mb-8"}>{t("monthlyAppointments")}</h2>
              <div>
                <p className={"text-[#8884d8]"}>{t("totalAppointments")}</p>
                <p className={"text-[#82ca9d]"}>{t("completedAppointments")}</p>
              </div>
            </div>

            <ChartDashboardDoctor />
          </Card>
        </div>
      </div>
      <div className={`w-full`}>
        <TableTodayAppointment />
      </div>
    </>
  );
};

export default Home;
