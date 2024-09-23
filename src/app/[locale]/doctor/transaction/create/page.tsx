import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import TransactionsForm from "@/components/doctor/transaction/TransactionsForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("common.transaction.create");
  return (
    <PageCard>
      <h2 className="card-title">{t("addTransaction")}</h2>
      <TransactionsForm />
    </PageCard>
  );
};

export default page;
