import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data =
    await ScheduleService.make().getClinicSchedules(clinicId);

  return (
    <ScheduleForm
      defaultValues={data.data}
      method={"update"}
      clinic_id={clinicId}
    />
  );
};

export default Page;
