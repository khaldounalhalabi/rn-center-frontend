"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
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
  const t = useTranslations("admin.service.create-edit");
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
    Navigate(`/admin/service`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("serviceName")}
          name={"name"}
        />
        <ApiSelect
          placeHolder={"Select Clinic Name ..."}
          required={true}
          name={"clinic_id"}
          api={async (page, search) =>
            await ClinicService.make<ClinicService>().indexWithPagination(
              page,
              search,
            )
          }
          getOptionLabel={(option: Clinic) => translate(option.name)}
          label={t("clinicName")}
          optionValue={"id"}
          defaultValues={
            defaultValues?.clinic_id ? [defaultValues?.clinic] : []
          }
        />
      </Grid>
      <Grid md={"2"}>
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>
            {t("status")}
            <span className="text-red-600">*</span>
          </label>
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
            label={t("inActive")}
            type="radio"
            className="radio radio-info"
            value={"in-active"}
            defaultChecked={defaultValues?.status == "in-active"}
          />
        </div>
        <ApiSelect
          placeHolder={"Select Category Name ..."}
          required={true}
          api={async (page, search): Promise<ApiResponse<ServiceCategory[]>> =>
            await CategoryService.make<CategoryService>().indexWithPagination(
              page,
              search,
            )
          }
          getOptionLabel={(option: ServiceCategory) => translate(option.name)}
          optionValue={"id"}
          name={"service_category_id"}
          label={t("category")}
          defaultValues={
            defaultValues?.service_category_id
              ? [defaultValues?.serviceCategory]
              : []
          }
        />
      </Grid>
      <Grid md={"2"}>
        <Input
          required={true}
          name={"approximate_duration"}
          type={"number"}
          step={"any"}
          placeholder={`${t("approximateDuration")} :`}
          label={t("approximateDuration")}
        />
        <Input
          required={true}
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
    </Form>
  );
};

export default ServiceForm;
