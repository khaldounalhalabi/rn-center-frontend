import Textarea from "@/components/common/ui/textArea/Textarea";
import Input from "@/components/common/ui/Inputs/Input";
import React from "react";
import { Prescription } from "@/Models/Prescriptions";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import { useTranslations } from "next-intl";

const TestForm = ({ defaultValue }: { defaultValue?: Prescription }) => {
  const SelectDate = ["day", "week", "year"];
  const t = useTranslations("common.prescription.create");

  return (
    <>
      <h2 className="card-title">{t("notes")}</h2>

      <Textarea name="test" label={t("test")} />
      <Textarea
        name="problem_description"
        label={`${t("problemDescription")}`}
      />
      <div className="flex gap-4">
        <div className="w-24 h-[45px]">
          <Input
            type={"number"}
            label={t("nextVisit")}
            name={"next"}
            step={"any"}
            defaultValue={
              defaultValue?.next_visit?.replace(/\D/g, "") ?? undefined
            }
          />
        </div>

        <SelectPopOverFrom
          status={defaultValue?.next_visit?.replace(/\d/g, "") ?? ""}
          label={t("date")}
          ArraySelect={SelectDate}
          name={"visit"}
          handleSelect={() => undefined}
        />
      </div>
    </>
  );
};
export default TestForm;
