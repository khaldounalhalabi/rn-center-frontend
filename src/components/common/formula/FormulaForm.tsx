"use client";
import { Navigate } from "@/actions/Navigate";
import FormFormulaEditor from "@/components/common/formula/FormFormulaEditor";
import FormFormulaSegmentInput from "@/components/common/formula/FormFormulaSegmentInput";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { RoleEnum } from "@/enums/RoleEnum";
import Formula from "@/models/Formula";
import FormulaVariable from "@/models/FormulaVariable";
import FormulaService from "@/services/FormulaService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Grid from "../ui/Grid";

const FormulaForm = ({
  variables = [],
  type = "store",
  defaultValues = undefined,
  role = RoleEnum.ADMIN,
}: {
  variables: FormulaVariable[];
  type: "store" | "update";
  defaultValues?: Formula;
  role: RoleEnum;
}) => {
  const [formula, setFormula] = useState("");
  const t = useTranslations("formulas");
  const onSubmit = async (data: { name: string; formula: string }) => {
    const service = FormulaService.make(role);
    if (type == "store") {
      return await service.store(data);
    }
    return await service.update(defaultValues?.id, data);
  };

  const onSuccess = async () => {
    await Navigate(`/${role}/formulas`);
  };
  return (
    <Form
      handleSubmit={onSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid>
        <FormInput name={"name"} type={"text"} label={t("name")} />
        <div className="md:col-span-2">
          <FormFormulaEditor
            name={"formula"}
            variables={variables}
            defaultFormula={defaultValues?.formula}
            defaultTemplate={defaultValues?.template}
            onChange={(input) => {
              setFormula(input);
            }}
          />
        </div>
        <div className="md:col-span-2">
          <FormFormulaSegmentInput
            formula={formula}
            name={"segments"}
            label={"Segments"}
            defaultValue={defaultValues?.formula_segments}
            variables={variables}
          />
        </div>
      </Grid>
    </Form>
  );
};

export default FormulaForm;
