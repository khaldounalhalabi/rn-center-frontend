import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import HolidayForm from "@/components/admin/holidays/HolidayForm";
import {getTranslations} from "next-intl/server";

const page =async () => {
    const t = await getTranslations('admin.holidays.create-edit')
  return (
    <PageCard>
      <h2 className="card-title">{t('addHolidays')}</h2>
      <HolidayForm />
    </PageCard>
  );
};

export default page;
