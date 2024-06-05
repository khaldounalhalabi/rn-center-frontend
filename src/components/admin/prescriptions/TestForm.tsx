import Textarea from "@/components/common/ui/textArea/Textarea";
import Input from "@/components/common/ui/Inputs/Input";
import React from "react";
import { Prescription } from "@/Models/Prescriptions";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";

const TestForm = ({ defaultValue }: { defaultValue?: Prescription }) => {
  const SelectDate = ["day", "week", "yar"];
  return (
    <>
      <h2 className="card-title">Test</h2>

      <Textarea name="test" label="Test" />
      <Textarea name="problem_description" label="Problem Description" />
      <div className="flex gap-4">
        <div className="w-24 h-[45px]">
          <Input
            type={"number"}
            label={"Next Visit:"}
            name={"next"}
            step={"any"}
            defaultValue={
              defaultValue?.next_visit?.replace(/\D/g, "") ?? undefined
            }
          />
        </div>

        <SelectPopOverFrom
          id={1}
          status={defaultValue?.next_visit?.replace(/\d/g, "") ?? ""}
          label={"Date :"}
          ArraySelect={SelectDate}
          name={"visit"}
        />
      </div>
    </>
  );
};
export default TestForm;
