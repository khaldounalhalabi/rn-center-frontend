import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import { ApiResponse } from "@/Http/Response";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const schedules: ApiResponse<any> =
    await ScheduleService.make<ScheduleService>().getClinicSchedules(clinicId);

  return (
    <ScheduleForm
      defaultValues={schedules.data}
      method={"update"}
      clinic_id={clinicId}
    />
  );
};

export default Page;
