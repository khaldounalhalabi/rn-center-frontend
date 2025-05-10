import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/buttons/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import { HolidayService } from "@/services/HolidayService";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";

const HolidayShowPage = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("holidays");
  const data = await HolidayService.make<HolidayService>().show(holidayId);
  const holiday = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("holiday_details")}</h2>
        <Link href={`/admin/holidays/${holiday.id}/edit`}>
          <PrimaryButton type={"button"}>{t("edit")}</PrimaryButton>
        </Link>
      </div>
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
