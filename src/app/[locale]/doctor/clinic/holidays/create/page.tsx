import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HolidayForm from "@/components/doctor/holiday/HolidayForm";
import {getTranslations} from "next-intl/server";

const page = async () => {
    const t = await getTranslations('doctor.holidays.create')
  return (
    <PageCard>
      <h2 className="card-title">{t("addHolidays")}</h2>
      <HolidayForm />
    </PageCard>
  );
};

export default page;