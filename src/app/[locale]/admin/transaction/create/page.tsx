import TransactionForm from "@/components/admin/transaction/TransactionsForm";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = async () => {
  const t = await getTranslations("common.transaction.create");
  return (
    <PageCard title={t("addTransaction")}>
      <TransactionForm type={"store"} role={RoleEnum.ADMIN} />
    </PageCard>
  );
};
export default Page;
