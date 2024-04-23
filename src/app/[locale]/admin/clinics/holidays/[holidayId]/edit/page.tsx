import PageCard from "@/components/common/ui/PageCard";
import HolidayForm from "@/components/admin/holidays/HolidayForm";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const holiday = (
    await ClinicHolidayService.make<ClinicHolidayService>().show(holidayId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Holidays</h2>
      <HolidayForm type={"update"} defaultValues={holiday} />
    </PageCard>
  );
};

export default page;
