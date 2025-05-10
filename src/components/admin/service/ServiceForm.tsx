"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/actions/Navigate";
import Grid from "@/components/common/ui/Grid";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ApiResponse } from "@/http/Response";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { useTranslations } from "next-intl";
import { ClinicsService } from "@/services/ClinicsService";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Clinic } from "@/models/Clinic";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import Gallery from "@/components/common/ui/images/Gallery";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import { RoleEnum } from "@/enum/RoleEnum";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { Label } from "@/components/common/ui/labels-and-values/Label";

const ServiceForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Service;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.service.create-edit");
  const handleSubmit = async (data: any) => {
    if (type === "update") {
      return ServiceService.make<ServiceService>(RoleEnum.ADMIN).update(
        defaultValues?.id,
        data,
      );
    } else {
      return await ServiceService.make<ServiceService>(RoleEnum.ADMIN).store(
        data,
      );
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/service`);
  };
  const { icon, ...rest } = defaultValues ?? { icon: "" };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={rest}
    >
      <Grid md={"2"}>
        <FormInput
          required={true}
          type={"text"}
          label={t("serviceName")}
          name={"name"}
        />
        <ApiSelect
          required={true}
          name={"clinic_id"}
          api={async (page, search) =>
            await ClinicsService.make<ClinicsService>().indexWithPagination(
              page,
              search,
            )
          }
          getOptionLabel={(option: Clinic) => option.user?.full_name}
          label={t("clinicName")}
          optionValue={"id"}
          defaultValues={
            defaultValues?.clinic?.id ? [defaultValues?.clinic] : []
          }
        />

        <ApiSelect
          required={true}
          api={async (page, search): Promise<ApiResponse<ServiceCategory[]>> =>
            await ServiceCategoryService.make<ServiceCategoryService>().indexWithPagination(
              page,
              search,
            )
          }
          optionValue={"id"}
          optionLabel={"name"}
          name={"service_category_id"}
          label={t("category")}
          defaultValues={
            defaultValues?.service_category?.id
              ? [defaultValues?.service_category]
              : []
          }
        />
        <FormInput
          required={true}
          name={"approximate_duration"}
          type={"number"}
          step={"any"}
          unit={"min"}
          placeholder={`${t("approximateDuration")} :`}
          label={t("approximateDuration")}
        />
        <FormInput
          required={true}
          name={"price"}
          type={"number"}
          step={"any"}
          unit={"iqd"}
          placeholder={"Price : "}
          label={t("price")}
        />
      </Grid>
      <FormTextarea
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
      {type == "update" && (
        <Label label={t("image")}>
          <Gallery media={defaultValues?.icon} />
        </Label>
      )}
      <ImageUploader name={"icon"} label={t("image")} />
    </Form>
  );
};

export default ServiceForm;
