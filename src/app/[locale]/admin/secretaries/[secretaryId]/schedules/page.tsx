import React from "react";
import { ScheduleService } from "@/services/ScheduleService";
import ScheduleForm from "@/components/admin/schedule/ScheduleForm";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { secretaryId },
}: {
  params: { secretaryId: number };
}) => {
  const data =
    await ScheduleService.make().getUserSchedules(secretaryId);
  return (
    <ScheduleForm
      defaultValues={data.data}
      method={"update"}
      user_id={secretaryId}
    />
  );
};

export default Page;
