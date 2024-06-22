import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import ShowSchedulePage from "@/components/doctor/schedule/ShowPage";

const page = async () => {
  const data =
    await ScheduleService.make<ScheduleService>("doctor").getDoctorSchedules();

  return (
    // @ts-ignore
    <ShowSchedulePage days={data?.data} gap={data.data.appointment_gap ?? 0} />
  );
};

export default page;