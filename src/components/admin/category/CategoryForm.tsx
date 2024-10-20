"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { CategoryService } from "@/services/CategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { useTranslations } from "next-intl";

const CategoryForm = ({
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
      return CategoryService.make<CategoryService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await CategoryService.make<CategoryService>("admin").store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/category`);
  };
  const t = useTranslations("admin.category.create-edit");
  const [locale, setLocale] = useState<"en" | "ar">("en");

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`${t("serviceCategoryName")}`}
          name={"name"}
          locale={locale}
        />
      </Grid>
    </Form>
  );
};

export default CategoryForm;
