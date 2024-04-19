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
import Grid from "@/components/common/ui/Grid";
import { translate } from "@/Helpers/Translations";
import { ApiResponse } from "@/Http/Response";
import { Department } from "@/Models/Departments";
import { getCookieClient } from "@/Actions/clientCookies";

const HospitalsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddHospital;
  id?: number;
  type?: "store" | "update";
}) => {
  const locale = getCookieClient("locale");
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return HospitalService.make<HospitalService>().update(defaultValues?.id ?? id, data);
    } else {
      return await HospitalService.make<HospitalService>().store(data);
    }
  };
  const onSuccess = () => {
    navigate(`${locale}/admin/hospitals`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={"Hospital Name"}
          name={"name"}
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Department[]>> =>
            await DepartmentsService.make<DepartmentsService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          isMultiple={true}
          getLabel={(option) => translate(option.name)}
          value={"id"}
          name={"available_departments"}
          inputLabel={"Available Departments"}
          selected={
            defaultValues?.available_departments
              ? defaultValues?.available_departments
              : []
          }
        />
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Hospital Phone Number"}
        label={"Hospital Phones"}
        defaultValue={defaultValues?.phone_numbers ?? []}
      />

      <ImageUploader name={"images"} isMultiple={true} />

      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default HospitalsForm;
