import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { ClinicTransactionService } from "@/services/ClinicTransactionService";
import { ClinicTransaction } from "@/Models/ClinicTransaction";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const t = await getTranslations("common.transaction.show");
  const data =
    await ClinicTransactionService.make<ClinicTransactionService>(
      "doctor",
    ).show(transactionId);
  const res: ClinicTransaction = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("transactionDetails")}</h2>
        <Link href={`/doctor/transaction/${transactionId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue
          label={t("patientName")}
          value={await TranslateServer(
            res?.appointment?.customer?.user?.full_name,
          )}
          color={"success"}
        />
        <LabelValue
          label={t("doctorName")}
          value={await TranslateServer(res?.clinic?.user?.full_name)}
        />
        <LabelValue label={t("type")} value={res.type} color={"accent"} />
        <LabelValue label={t("status")} value={res.status} color={"info"} />
        <LabelValue
          color={"warning"}
          label={t("amount")}
          value={`${
            res?.type == "income"
              ? "+"
              : res?.type == "outcome"
                ? "-"
                : res?.type == "system_debt"
                  ? "-"
                  : "+"
          } ${res?.amount.toLocaleString()} IQD`}
        />

        <LabelValue label={t("date")} value={res?.date} color={"error"} />

        <LabelValue
          color={"secondary"}
          label={t("appointmentDate")}
          value={res?.appointment?.date}
        />

        <LabelValue
          color={"primary"}
          label={t("totalCost")}
          value={res?.appointment?.total_cost}
        />
      </Grid>
      <Label label={t("notes")} col>
        <textarea
          className="text-sm textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.notes ?? ""}
        />
      </Label>
    </PageCard>
  );
};

export default page;
