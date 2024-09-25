import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import { TransactionService } from "@/services/TransactionService";
import TransactionsForm from "@/components/admin/transaction/TransactionsForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const t = await getTranslations("common.transaction.create");
  const transaction = (
    await TransactionService.make<TransactionService>("admin").show(
      transactionId,
    )
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editTransaction")}</h2>
      <TransactionsForm
        type={"update"}
        defaultValues={{
          ...transaction,
        }}
      />
    </PageCard>
  );
};

export default page;
