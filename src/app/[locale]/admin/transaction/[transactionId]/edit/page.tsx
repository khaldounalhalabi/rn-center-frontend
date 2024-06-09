import PageCard from "@/components/common/ui/PageCard";
import React from "react";


import {TransactionService} from "@/services/TransactionService";
import TransactionsForm from "@/components/admin/transaction/TransactionsForm";

const page = async ({
                        params: { transactionId },
                    }: {
    params: { transactionId: number };
}) => {
    const transaction = (
        await TransactionService.make<TransactionService>("admin").show(transactionId)
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