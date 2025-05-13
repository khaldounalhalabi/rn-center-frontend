import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/models/Transaction";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const data =
    await TransactionService.make<TransactionService>().show(transactionId);
  const res: Transaction = data?.data;
  const t = await getTranslations("common.transaction.show");

  return (
    <PageCard>
      <div className="flex h-24 w-full items-center justify-between">
        <h2 className="card-title">{t("transactionDetails")}</h2>
        <Link href={`/admin/transaction/${transactionId}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue label={t("actor_name")} value={res?.actor?.full_name} />
        {/*TODO: add user page button to get to the actor page*/}
        <LabelValue
          label={t("type")}
          value={<TranslatableEnum value={res?.type} />}
        />
        <LabelValue label={t("amount")} value={res?.amount} />
        <LabelValue label={t("date")} value={res?.date} />
        <LabelValue label={t("notes")} value={res?.description} col />
      </Grid>
    </PageCard>
  );
};

export default page;
