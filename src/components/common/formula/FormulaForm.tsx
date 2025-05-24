"use client";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import FormulaVariable from "@/models/FormulaVariable";
import FormFormulaEditor from "@/components/common/formula/FormFormulaEditor";
import FormulaService from "@/services/FormulaService";
import Formula from "@/models/Formula";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";
import FormFormulaSegmentInput from "@/components/common/formula/FormFormulaSegmentInput";

const FormulaForm = ({
  variables = [],
  type = "store",
  defaultValues = undefined,
}: {
  variables: FormulaVariable[];
  type: "store" | "update";
  defaultValues?: Formula;
}) => {
  const [formula, setFormula] = useState("");
  const t = useTranslations("formulas");
  const onSubmit = async (data: { name: string; formula: string }) => {
    const service = FormulaService.make();
    if (type == "store") {
      return await service.store(data);
    }
    return await service.update(defaultValues?.id, data);
  };

  const onSuccess = async () => {
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
        variables={variables}
        defaultFormula={defaultValues?.formula}
        defaultTemplate={defaultValues?.template}
        onChange={(input) => {
          setFormula(input);
        }}
      />
      <FormFormulaSegmentInput
        formula={formula}
        name={"segments"}
        label={"Segments"}
        defaultValue={defaultValues?.formula_segments}
      />
    </Form>
  );
};

export default FormulaForm;
