import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer, {
  TranslateStatusOrTypeServer,
} from "@/Helpers/TranslationsServer";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const data =
    await TransactionService.make<TransactionService>().show(transactionId);
  const res: Transactions = data?.data;
  const t = await getTranslations("common.transaction.show");

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("transactionDetails")}</h2>
        <Link href={`/admin/transaction/${transactionId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          {t("actor_name")} :{" "}
          <span className="ml-2 badge badge-primary">
            {await TranslateServer(res?.actor?.first_name)}{" "}
            {await TranslateServer(res?.actor?.middle_name)}{" "}
            {await TranslateServer(res?.actor?.last_name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("type")} :{" "}
          <span className="ml-2 badge badge-outline  ">{res.type}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("amount")} :{" "}
          <span className="ml-2 badge badge-warning" suppressHydrationWarning>
            {res?.amount.toLocaleString()} {t("iqd")}
          </span>
        </label>

        <label className="label justify-start text-xl">
          {t("date")} :{" "}
          <span className="ml-2 badge badge-accent  ">
            {res?.date ?? (await TranslateStatusOrTypeServer("no_data"))}
          </span>
        </label>
      </Grid>
      <label className={"label text-xl"}>{t("description")} :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={res?.description ?? ""}
      />
    </PageCard>
  );
};

export default page;
