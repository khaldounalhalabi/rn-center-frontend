import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import TransactionsForm from "@/components/admin/transaction/TransactionsForm";

const page = async () => {
    return (
        <PageCard>
            <h2 className="card-title">Add Transaction</h2>
            <TransactionsForm />
        </PageCard>
    );
};

export default page;