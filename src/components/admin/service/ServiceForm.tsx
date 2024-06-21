"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { ApiResponse } from "@/Http/Response";
import { CategoryService } from "@/services/CategoryService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useTranslations } from "next-intl";
import { ClinicsService } from "@/services/ClinicsService";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import { Clinic } from "@/Models/Clinic";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import Gallery from "@/components/common/ui/Gallery";
import ImageUploader from "@/components/common/ui/ImageUploader";

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
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { icon, ...rest } = defaultValues??{icon:""};
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={rest}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("serviceName")}
          name={"name"}
          locale={locale}
        />
        <ApiSelect
          placeHolder={"Select Clinic Name ..."}
          required={true}
          name={"clinic_id"}
          api={async (page, search) =>
            await ClinicsService.make<ClinicsService>().indexWithPagination(
              page,
              search,
            )
          }
          getOptionLabel={(option: Clinic) => TranslateClient(option.name)}
          label={t("clinicName")}
          optionValue={"id"}
          defaultValues={
            defaultValues?.clinic?.id ? [defaultValues?.clinic] : []
          }
        />
      </Grid>
      <Grid md={"2"}>
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>
            {t("status")}
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
          getOptionLabel={(option: ServiceCategory) =>
            TranslateClient(option.name)
          }
          optionValue={"id"}
          name={"service_category_id"}
          label={t("category")}
          defaultValues={
            defaultValues?.serviceCategory?.id
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
          unit={"min"}
          placeholder={`${t("approximateDuration")} :`}
          label={t("approximateDuration")}
        />
        <Input
          required={true}
          name={"price"}
          type={"number"}
          step={"any"}
          unit={"IQD"}
          placeholder={"Price : "}
          label={t("price")}
        />
      </Grid>
      <TranslatableTextArea
        name={"description"}
        locale={locale}
        defaultValue={defaultValues?.description ?? ""}
      />
      {type == "update" ? (
          defaultValues?.icon &&
          defaultValues?.icon?.length > 0 ? (
              <Gallery
                  media={
                    defaultValues?.icon ? defaultValues?.icon : [""]
                  }
              />
          ) : (
              <div className="flex justify-between items-center">
                <label className="label"> {("Image")} : </label>
                <span className="text-lg badge badge-neutral">
                {("No Image")}
              </span>
              </div>
          )
      ) : (
          ""
      )}
      <ImageUploader name={"icon"}  />
    </Form>
  );
};

export default ServiceForm;