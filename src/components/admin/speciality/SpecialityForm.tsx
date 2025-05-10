"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Speciality } from "@/Models/Speciality";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { SpecialityService } from "@/services/SpecialityService";
import { Navigate } from "@/Actions/navigate";
import { useTranslations } from "next-intl";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Gallery from "@/components/common/ui/Gallery";
import Input from "@/components/common/ui/inputs/Input";
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
      return await SpecialityService.make<SpecialityService>().update(
        defaultValues?.id,
        data,
      );
    } else {
      return await SpecialityService.make<SpecialityService>().store(data);
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
        <Input
          required={true}
          type={"text"}
          label={t("specialityName")}
          name={"name"}
        />
      </Grid>

      <Textarea
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
