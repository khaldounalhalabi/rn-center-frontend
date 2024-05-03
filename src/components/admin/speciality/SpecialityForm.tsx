"use client";
import Form from "@/components/common/ui/Form";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import React from "react";
import { AddSpeciality } from "@/Models/Speciality";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { SpecialityService } from "@/services/SpecialityService";
import InputTags from "@/components/common/ui/InputTags";
import { Navigate } from "@/Actions/navigate";
import { useTranslations } from "next-intl";

const SpecialityForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddSpeciality;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.speciality.create-edit");
  const handleSubmit = async (data: any) => {
    if (
      type == "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return await SpecialityService.make<SpecialityService>().update(
        defaultValues?.id ?? id,
        data,
      );
    } else {
      return await SpecialityService.make<SpecialityService>().store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/speciality`);
  };
  const array = defaultValues?.tags.split(",");
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <div>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("specialityName")}
          name={"name"}
        />
      </div>
      <div className="my-3">
        <InputTags name={"tags"} label={`${t("tags")} :`} />
      </div>
      <div className="my-3">
        <Textarea
          name={"description"}
          label={`${t("description")} :`}
          defaultValue={array ?? []}
        />
      </div>
    </Form>
  );
};

export default SpecialityForm;
