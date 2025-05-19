import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import FormulaVariableService from "@/services/FormulaVariableService";
import FormulaForm from "@/components/common/formula/FormulaForm";

const Page = async () => {
  const t = await getTranslations("formulas");
  const variables = await FormulaVariableService.make().all();
  return (
    <PageCard title={t("create_title")}>
      <FormulaForm variables={variables.data ?? []} type={"store"} />
    </PageCard>
  );
};

export default Page;
