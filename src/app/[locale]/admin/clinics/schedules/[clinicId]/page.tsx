import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import { ScheduleResponse } from "@/Models/Schedule";
import { ApiResponse } from "@/Http/Response";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const schedules: ApiResponse<any> =
    await ScheduleService.make<ScheduleService>().getClinicSchedules(clinicId);

  const defaultValues: ScheduleResponse = {
    clinic_id: clinicId,
    schedules: { ...schedules.data },
  };

  return <ScheduleForm defaultValues={defaultValues} method={"update"} />;
};

export default Page;
