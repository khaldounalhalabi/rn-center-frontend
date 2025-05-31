"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Speciality } from "@/models/Speciality";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { SpecialityService } from "@/services/SpecialityService";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import Gallery from "@/components/common/ui/images/Gallery";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Grid from "@/components/common/ui/Grid";

const SpecialityForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Speciality;
  type?: "store" | "update";
}) => {
  const { image, ...values } = defaultValues ?? { image: [] };

  const t = useTranslations("admin.speciality.create-edit");
  const handleSubmit = async (data: any) => {
    if (type == "update" && defaultValues?.id) {
      return await SpecialityService.make().update(
        defaultValues?.id,
        data,
      );
    } else {
      return await SpecialityService.make().store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/speciality`);
  };
  const array = defaultValues?.tags?.split(",") ?? [];
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={values}
    >
      <Grid>
        <FormInput
          required={true}
          type={"text"}
          label={t("specialityName")}
          name={"name"}
        />
      </Grid>

      <FormTextarea
        name={"description"}
        label={`${t("description")}`}
        defaultValue={array ?? []}
      />
      {type == "update" && defaultValues?.image?.length != 0 && (
        <Gallery media={defaultValues?.image} />
      )}
      <ImageUploader name={"image"} />
    </Form>
  );
};

export default SpecialityForm;
