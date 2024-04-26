"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { ApiResponse } from "@/Http/Response";
import { CategoryService } from "@/services/CategoryService";
import { translate } from "@/Helpers/Translations";
import { useTranslations } from "next-intl";
import { ClinicService } from "@/services/ClinicService";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import { Clinic } from "@/Models/Clinic";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";

const ServiceForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Service;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    console.log(data);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return ServiceService.make<ServiceService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await ServiceService.make<ServiceService>("admin").store(data);
    }
  };
  const onSuccess = () => {
    navigate(`/admin/category`);
  };
  const t = useTranslations("clinic.create-edit");

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
          label={"Service Name"}
          name={"name"}
        />
        <ApiSelect
          name={"clinic_id"}
          api={async (page, search) =>
            await ClinicService.make<ClinicService>().indexWithPagination(
              page,
              search
            )
          }
          getOptionLabel={(option: Clinic) => translate(option.name)}
          label={"Clinic Name"}
          optionValue={"id"}
          defaultValues={
            defaultValues?.clinic_id ? [defaultValues?.clinic] : []
          }
        />
      </Grid>
      <Grid md={"2"}>
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Status:</label>
          <Input
            name={"status"}
            label={t("active")}
            type="radio"
            className="radio radio-info"
            value={"active"}
            defaultChecked={
              defaultValues ? defaultValues?.status == "active" : true
            }
          />
          <Input
            name={"status"}
            label={t("in-active")}
            type="radio"
            className="radio radio-info"
            value={"in-active"}
            defaultChecked={defaultValues?.status == "in-active"}
          />
        </div>
        <ApiSelect
          api={async (page, search): Promise<ApiResponse<ServiceCategory[]>> =>
            await CategoryService.make<CategoryService>().indexWithPagination(
              page,
              search
            )
          }
          getOptionLabel={(option: ServiceCategory) => translate(option.name)}
          optionValue={"id"}
          name={"service_category_id"}
          label={"Category"}
          defaultValues={
            defaultValues?.service_category_id
              ? [defaultValues?.serviceCategory]
              : []
          }
        />
      </Grid>
      <Grid md={"2"}>
        <Input
          name={"approximate_duration"}
          type={"number"}
          step={"any"}
          placeholder={"Approximate Duration :"}
          label={t("Duration")}
        />
        <Input
          name={"price"}
          type={"number"}
          step={"any"}
          placeholder={"Price : "}
          label={t("price")}
        />
      </Grid>
      <TranslatableTextArea
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default ServiceForm;
