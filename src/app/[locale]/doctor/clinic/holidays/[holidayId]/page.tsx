import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import TranslateServer from "@/Helpers/TranslationsServer";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import Grid from "@/components/common/ui/Grid";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("admin.holidays.show");
  const data =
    await ClinicHolidayService.make<ClinicHolidayService>("doctor").show(
      holidayId
    );
  const res: ClinicHoliday = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("holidayDetails")}</h2>
        <Link href={`/doctor/clinic/holidays/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid gap={8}>
        <LabelValue
          label={t("startHoliday")}
          value={res?.start_date}
          color={"primary"}
        />

        <LabelValue
          label={t("endHoliday")}
          value={res?.end_date}
          color={"primary"}
        />
      </Grid>

      <Label label={`${t("reason")} En`} col>
        <textarea
          rows={4}
          dir="ltr"
          value={(await TranslateServer(res?.reason, true)).en}
          className="block border-gray-300 bg-white p-2.5 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-lg focus:ring-blue-500"
          readOnly={true}
        />
      </Label>

      <Label label={`${t("reason")} Ar`} col>
        <textarea
          rows={4}
          dir="ltr"
          value={(await TranslateServer(res?.reason, true)).ar}
          className="block border-gray-300 bg-white p-2.5 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-lg focus:ring-blue-500"
          readOnly={true}
        />
      </Label>
    </PageCard>
  );
};

export default page;
