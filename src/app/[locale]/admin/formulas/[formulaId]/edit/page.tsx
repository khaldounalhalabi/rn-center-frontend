import React from "react";
import FormulaService from "@/services/FormulaService";
import FormulaVariableService from "@/services/FormulaVariableService";
import PageCard from "@/components/common/ui/PageCard";
import FormulaForm from "@/components/common/formula/FormulaForm";
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
      />
    </PageCard>
  );
};

export default Page;
