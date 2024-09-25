import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";

const page = async ({
  params: { deductionId },
}: {
  params: { deductionId: number };
}) => {
  const t = await getTranslations("common.deductions.show");
  const data =
    await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "doctor"
    ).show(deductionId);
  const res: AppointmentDeductions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("appointmentDeductionDetails")} :</h2>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue
          label={t("amount")}
          value={res?.amount?.toLocaleString()}
          color={"primary"}
        />

        <LabelValue label={t("status")} value={res?.status} color={"success"} />
        <LabelValue label={t("date")} value={res?.date} color={"accent"} />

        <LabelValue
          label={t("totalCost")}
          value={`${res?.appointment?.total_cost?.toLocaleString()} IQD`}
          color={"info"}
        />

        <LabelValue
          label={t("appointmentDate")}
          value={res?.appointment?.date}
          color={"warning"}
        />
      </Grid>
      <Label label={t("note")} col>
        <textarea
          className="w-full p-2"
          disabled={true}
          defaultValue={res?.appointment?.note ?? ""}
        />
      </Label>
    </PageCard>
  );
};

export default page;
