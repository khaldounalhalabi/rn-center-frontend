import React from "react";
import ScheduleForm from "@/components/doctor/schedule/ScheduleForm";
import {ScheduleService} from "@/services/ScheduleService";

const Page =async () => {
 const data =  await ScheduleService.make<ScheduleService>('doctor').getDoctorSchedules()
  const { appointment_gap, ...schedules } = data.data;

  return (
      <ScheduleForm
          defaultValues={schedules}
          method={"update"}
          appointment_gap={appointment_gap??0}
      />
  );
};

export default Page;