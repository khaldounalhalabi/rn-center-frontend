import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import TransactionsForm from "@/components/doctor/transaction/TransactionsForm";
import {ClinicTransactionService} from "@/services/ClinicTransactionService";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const transaction = (
    await ClinicTransactionService.make<ClinicTransactionService>("doctor").show(
      transactionId,
    )
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Transaction</h2>
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