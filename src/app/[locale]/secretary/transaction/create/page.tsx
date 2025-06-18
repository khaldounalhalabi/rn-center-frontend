import TransactionForm from "@/components/admin/transaction/TransactionsForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("common.transaction.create");
  return (
    <PageCard title={t("addTransaction")}>
      <TransactionForm type={"store"} role={RoleEnum.SECRETARY} />
    </PageCard>
  );
};
export default Page;
