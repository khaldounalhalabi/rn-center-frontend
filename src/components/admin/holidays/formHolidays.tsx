"use client";
import Form from "@/components/common/ui/Form";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { ClinicService } from "@/services/ClinicService";
import React from "react";
import { AddHolidays } from "@/services/Holidays";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableTextArea from "@/components/common/ui/TranslatableTextArea";
import { AddHolidayes } from "@/services/AddHolidayes";

const FormHolidays = ({
  defaultValues = undefined,
  id = undefined,
}: {
  defaultValues?: AddHolidays | undefined | null;
  id?: number | undefined;
}) => {
  const handleSubmit = async (data) => {
    console.log(data);
    return await AddHolidayes.make().store(data);
  };
  const onSuccess = () => {};

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <div className=" w-1/2 my-3">
        <SelectPaginated
          api={async (page, search) =>
            await ClinicService.make().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          label={"name"}
          value={"id"}
          name={"clinic_id"}
          inputLabel={"Clinic name :"}
          selected={defaultValues?.clinic_id ? defaultValues?.clinic_id : []}
        />
      </div>
      <div className="w-full flex justify-between	my-3">
        <Input
          name={"start_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"Start Holiday"}
          defaultValue={
            defaultValues?.start_date ? defaultValues?.start_date : []
          }
        />
        <div className="w-1/12"></div>
        <Input
          name={"end_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={"End Holiday"}
          defaultValue={defaultValues?.end_date ? defaultValues?.end_date : []}
        />
      </div>
      <div className="my-3">
        <TranslatableTextArea
          label={"Reason"}
          name={"reason"}
          locales={["en", "ar"]}
        />
      </div>
      <PrimaryButton type={"submit"}>Submit</PrimaryButton>
    </Form>
  );
};

export default FormHolidays;
