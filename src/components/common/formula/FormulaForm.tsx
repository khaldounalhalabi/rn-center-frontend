"use client";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Form from "@/components/common/ui/Form";
import React from "react";
import FormulaVariable from "@/models/FormulaVariable";
import FormFormulaEditor from "@/components/common/formula/FormFormulaEditor";
import FormulaService from "@/services/FormulaService";
import { ApiResponse } from "@/http/Response";
import Formula from "@/models/Formula";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";

const FormulaForm = ({
  variables = [],
  type = "store",
  defaultValues = undefined,
}: {
  variables: FormulaVariable[];
  type: "store" | "update";
  defaultValues?: Formula;
}) => {
  const t = useTranslations("formulas");
  const onSubmit = async (data: { name: string; formula: string }) => {
    const service = FormulaService.make();
    if (type == "store") {
      return await service.store(data);
    }
    return await service.update(defaultValues?.id, data);
  };

  const onSuccess = async (res: ApiResponse<Formula>) => {
    await Navigate("/admin/formulas");
  };
  return (
    <Form
      handleSubmit={onSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <FormInput name={"name"} type={"text"} label={t("name")} />
      <FormFormulaEditor
        name={"formula"}
        label={t("formula")}
        variables={variables}
        defaultFormula={defaultValues?.formula}
        defaultTemplate={defaultValues?.template}
      />
    </Form>
  );
};

export default FormulaForm;
