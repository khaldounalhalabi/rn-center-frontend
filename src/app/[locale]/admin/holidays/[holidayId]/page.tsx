import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import { HolidayService } from "@/services/HolidayService";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Button } from "@/components/ui/shadcn/button";

const HolidayShowPage = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("holidays");
  const data = await HolidayService.make().show(holidayId);
  const holiday = data?.data;
  return (
    <PageCard
      title={t("holiday_details")}
      actions={
        <Link href={`/admin/holidays/${holiday.id}/edit`}>
          <Button type={"button"}>{t("edit")}</Button>
        </Link>
      }
    >
      <Grid md={2} gap={5}>
        <LabelValue label={t("from")} value={holiday?.from} color={"error"} />
        <LabelValue label={t("to")} value={holiday?.to} color={"pom"} />
        <div className={"md:col-span-2"}>
          <LabelValue label={t("reason")} col={true} value={holiday?.reason} />
        </div>
      </Grid>
    </PageCard>
  );
};

export default HolidayShowPage;
