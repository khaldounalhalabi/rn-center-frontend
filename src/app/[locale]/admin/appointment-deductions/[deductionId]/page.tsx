import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { deductionId },
}: {
  params: { deductionId: number };
}) => {
  const t = await getTranslations("common.deductions.show");
  const data =
    await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin",
    ).show(deductionId);
  const res: AppointmentDeductions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("appointmentDeductionDetails")} :</h2>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          {t("clinicName")} :{" "}
          <span className="ml-2 badge badge-error">
            {await TranslateServer(res?.clinic?.name)}
          </span>
        </label>
        <label className="label">
          {t("amount")} :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.amount?.toLocaleString()}
          </span>
        </label>
        <label className="label">
          {t("status")} :
          <span className="badge-primary px-2 rounded-xl text-lg">
            {res?.status}
          </span>
        </label>
        <label className="label">
          {t("date")} :
          <span className="badge-outline px-2 rounded-xl text-lg">
            {res?.date}
          </span>
        </label>
        <label className="label">
          {t("totalCost")} :
          <span className="badge-warning px-2 rounded-xl text-lg">
            {res?.appointment?.total_cost?.toLocaleString()}
          </span>
        </label>
        <label className="label">
          {t("appointmentDate")} :
          <span className="badge-success px-2 rounded-xl text-lg">
            {res?.appointment?.date}
          </span>
        </label>
      </Grid>
      <div className="w-full">
        <label className="label">{t("note")} :</label>
        <textarea
          className="w-full p-2"
          disabled={true}
          defaultValue={res?.appointment?.note ?? ""}
        ></textarea>
      </div>
    </PageCard>
  );
};

export default page;
