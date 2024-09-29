"use client";
import React from "react";
import ChartDashboardAdmin from "@/components/admin/dashboard/ChartDashboardAdmin";
import Card from "@/components/common/ui/Card";
import { useQuery } from "@tanstack/react-query";
import { StatisticService } from "@/services/StatisticService";
import { AdminStatistics } from "@/Models/Statistics";
import UserDataAdmin from "@/components/admin/dashboard/UserDataAdmin";
import CardsAppointmentAdmin from "@/components/admin/dashboard/CardsAppointmentAdmin";
import TableRecent from "@/components/admin/dashboard/TableRecent";
import { useTranslations } from "next-intl";

const Page = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["StatisticAdmin"],
    queryFn: async () => {
      return await StatisticService.make<StatisticService>(
        "admin",
      ).adminIndexPageStatistics();
    },
  });

  const statisticsRes: AdminStatistics | undefined = data?.data;
  const t = useTranslations("common.dashboard");

  return (
    <>
      <div className={"flex flex-col justify-between md:flex-row my-6"}>
        <div className="md:w-[40%] w-full px-4">
          <UserDataAdmin
            statisticsRes={statisticsRes}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>

        <div className={"w-full"}>
          <CardsAppointmentAdmin
            statisticsRes={statisticsRes}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Card>
            <h2 className={"card-title mb-8"}>
              {t("earningsFromAppointments")}
            </h2>
            <ChartDashboardAdmin />
          </Card>
        </div>
      </div>
      <div className={`w-full`}>
        <TableRecent />
      </div>
    </>
  );
};

export default Page;
