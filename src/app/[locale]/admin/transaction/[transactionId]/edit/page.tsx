import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import { TransactionService } from "@/services/TransactionService";
import TransactionsForm from "@/components/admin/transaction/TransactionsForm";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const t = await getTranslations("common.transaction.create");
  const transaction = (
    await TransactionService.make(RoleEnum.ADMIN).show(transactionId)
  ).data;
  return (
    <PageCard title={t("editTransaction")}>
      <TransactionsForm type={"update"} defaultValues={transaction} />
    </PageCard>
  );
};

export default page;
