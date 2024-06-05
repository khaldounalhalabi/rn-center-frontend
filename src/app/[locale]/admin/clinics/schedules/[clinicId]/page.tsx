import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data =
    await ScheduleService.make<ScheduleService>().getClinicSchedules(clinicId);

  const { appointment_gap, ...schedules } = data.data;

  return (
    <ScheduleForm
      defaultValues={schedules}
      method={"update"}
      clinic_id={clinicId}
      appointment_gap={appointment_gap}
    />
  );
};

export default Page;
