import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import { ApiResponse } from "@/Http/Response";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";

const Page = async ({
  params: { schedulesId },
}: {
  params: { schedulesId: number };
}) => {
  const schedules: ApiResponse<any> =
    await ScheduleService.make<ScheduleService>().getClinicSchedules(schedulesId);

  return (
    <ScheduleForm
      defaultValues={schedules.data}
      method={"update"}
      schedules_Id={schedulesId}
    />
  );
};

export default Page;
