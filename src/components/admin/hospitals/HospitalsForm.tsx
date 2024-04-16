"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { AddHospital } from "@/Models/Hospital";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { DepartmentsService } from "@/services/DepartmentsService";
import { HospitalService } from "@/services/HospitalService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { navigate } from "@/Actions/navigate";

const HospitalsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddHospital;
  id?: number;
  type?: "store" | "update";
}) => {

  const handleSubmit = async (data: any) => {
    console.log(data);
    if (type === "update" && defaultValues?.id) {
      return HospitalService.make().update(defaultValues.id, data);
    } else {
      return await HospitalService.make().store(data);
    }
  };
  const onSuccess = () => {
    navigate(`/admin/clinics/hospitals`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <div>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={"Hospital Name"}
          name={"name"}
        />
      </div>
      <div className="my-3">
        <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          placeholder={"Enter Hospital Phone Number"}
          label={"Hospital Phones"}
          defaultValue={defaultValues?.phone_numbers ?? []}
        />
      </div>

      <div className="my-3">
        <SelectPaginated
          api={async (page, search) =>
            await DepartmentsService.make().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          isMultiple={true}
          label={"name"}
          value={"id"}
          name={"available_departments"}
          inputLabel={"Available Departments"}
          selected={
            defaultValues?.available_departments
              ? defaultValues?.available_departments
              : []
          }
        />
      </div>
      <div>
        <ImageUploader name={"images"} />
      </div>

      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default HospitalsForm;
