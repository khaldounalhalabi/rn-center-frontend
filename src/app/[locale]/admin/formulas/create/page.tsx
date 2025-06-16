import FormulaForm from "@/components/common/formula/FormulaForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import FormulaVariableService from "@/services/FormulaVariableService";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("formulas");
  const variables = await FormulaVariableService.make().all();
  return (
    <PageCard title={t("create_title")}>
      <FormulaForm
        role={RoleEnum.ADMIN}
        variables={variables.data ?? []}
        type={"store"}
      />
    </PageCard>
  );
};

export default Page;
