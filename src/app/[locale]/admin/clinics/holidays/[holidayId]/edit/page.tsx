import PageCard from "@/components/common/ui/PageCard";
import HolidayForm from "@/components/admin/holidays/HolidayForm";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const holiday = (
    await ClinicHolidayService.make<ClinicHolidayService>().show(holidayId)
  ).data;
  const t = await getTranslations("admin.holidays.creat-edit");
  return (
    <PageCard>
      <h2 className="card-title">{t("editHolidays")}</h2>
      <HolidayForm type={"update"} defaultValues={holiday} />
    </PageCard>
  );
};

export default page;
