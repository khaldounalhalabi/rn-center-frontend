import FormulaForm from "@/components/common/formula/FormulaForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import FormulaService from "@/services/FormulaService";
import FormulaVariableService from "@/services/FormulaVariableService";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { formulaId },
}: {
  params: { formulaId: number };
}) => {
  const formula = (await FormulaService.make().show(formulaId)).data;
  const variables = (await FormulaVariableService.make().all()).data;
  const t = await getTranslations("formulas");

  return (
    <PageCard title={t("edit_title")}>
      <FormulaForm
        variables={variables}
        type={"update"}
        defaultValues={formula}
        role={RoleEnum.ADMIN}
      />
    </PageCard>
  );
};

export default Page;
