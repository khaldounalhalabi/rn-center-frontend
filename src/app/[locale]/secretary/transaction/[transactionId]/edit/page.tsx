import PageCard from "@/components/common/ui/PageCard";

import TransactionsForm from "@/components/admin/transaction/TransactionsForm";
import { RoleEnum } from "@/enums/RoleEnum";
import { TransactionService } from "@/services/TransactionService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const t = await getTranslations("common.transaction.create");
  const transaction = (
    await TransactionService.make(RoleEnum.SECRETARY).show(transactionId)
  ).data;
  return (
    <PageCard title={t("editTransaction")}>
      <TransactionsForm
        type={"update"}
        defaultValues={transaction}
        role={RoleEnum.SECRETARY}
      />
    </PageCard>
  );
};

export default page;
