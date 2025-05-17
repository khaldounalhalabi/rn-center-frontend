import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import { HolidayService } from "@/services/HolidayService";
import { RoleEnum } from "@/enums/RoleEnum";
import HolidaysForm from "@/components/admin/holidays/HolidaysForm";

const EditHolidayPage = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("holidays");

  const holiday = (
    await HolidayService.make<HolidayService>(RoleEnum.ADMIN).show(holidayId)
  ).data;
  return (
    <PageCard title={t("update_title")}>
      <HolidaysForm type={"update"} defaultValues={holiday} />
    </PageCard>
  );
};

export default EditHolidayPage;
