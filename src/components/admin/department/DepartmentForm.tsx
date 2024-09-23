"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import { Navigate } from "@/Actions/navigate";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import { AvailableDepartmentService } from "@/services/AvailableDepartmentService";
import { AvailableDepartment } from "@/Models/AvailableDepartment";
import { useTranslations } from "next-intl";

const DepartmentForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  type?: "store" | "update";
  defaultValues?: AvailableDepartment;
  id?: number;
}) => {
  const t = useTranslations("admin.departments");

  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return AvailableDepartmentService.make<AvailableDepartmentService>(
        "admin",
      )
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await AvailableDepartmentService.make<AvailableDepartmentService>(
        "admin",
      ).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/hospital-departments`);
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      setLocale={setLocale}
      defaultValues={defaultValues}
    >
      <TranslatableInput
        type={"text"}
        placeholder={`Mark`}
        locales={["en", "ar"]}
        label={t("name")}
        name={"name"}
        required={true}
        locale={locale}
      />
      <div className={"mt-2"}>
        <TranslatableTextArea
          name={"description"}
          locale={locale}
          defaultValue={defaultValues?.description ?? ""}
        />
      </div>
    </Form>
  );
};

export default DepartmentForm;
