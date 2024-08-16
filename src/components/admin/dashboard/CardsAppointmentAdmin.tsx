"use client";
import Card from "@/components/common/ui/Card";
import React from "react";
import { AdminStatistics } from "@/Models/Statistics";
import LoadingSpin from "@/components/icons/LoadingSpin";

const CardsAppointmentAdmin = ({
  statisticsRes,
  isFetching,
  isLoading,
}: {
  statisticsRes: AdminStatistics | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  return (
    <div className={"flex pl-4 md:pl-0 flex-wrap mb-6 gap-5"}>
      <Card>
        <div
          className={
            "flex w-full justify-between gap-4 items-center min-w-[210px]"
          }
        >
          <div className={"flex flex-col justify-between "}>
            <p>Total Appointments</p>
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
            <p>Upcoming Appointments</p>
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

export default CardsAppointmentAdmin;
