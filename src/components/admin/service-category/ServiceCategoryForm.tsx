"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/actions/Navigate";
import Grid from "@/components/common/ui/Grid";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { ServiceCategory } from "@/models/ServiceCategory";
import { useTranslations } from "next-intl";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { RoleEnum } from "@/enums/RoleEnum";

const ServiceCategoryForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  onSuccess = undefined,
}: {
  defaultValues?: ServiceCategory;
  id?: number;
  type?: "store" | "update";
  onSuccess?: () => void;
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return ServiceCategoryService.make(RoleEnum.ADMIN)
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await ServiceCategoryService.make(
        RoleEnum.ADMIN,
      ).store(data);
    }
  };
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      Navigate(`/admin/service-categories`);
    }
  };
  const t = useTranslations("admin.category.create-edit");

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={handleSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"1"}>
        <FormInput
          required={true}
          type={"text"}
          label={`${t("serviceCategoryName")}`}
          name={"name"}
        />
      </Grid>
    </Form>
  );
};

export default ServiceCategoryForm;
