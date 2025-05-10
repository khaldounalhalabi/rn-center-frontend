"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { useTranslations } from "next-intl";
import Input from "@/components/common/ui/inputs/Input";
import { RoleEnum } from "@/enum/RoleEnum";

const ServiceCategoryForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: ServiceCategory;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return ServiceCategoryService.make<ServiceCategoryService>(RoleEnum.ADMIN)
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await ServiceCategoryService.make<ServiceCategoryService>(
        RoleEnum.ADMIN,
      ).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/service-categories`);
  };
  const t = useTranslations("admin.category.create-edit");

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <Input
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
