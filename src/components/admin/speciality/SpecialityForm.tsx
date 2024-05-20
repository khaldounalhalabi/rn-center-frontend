"use client";
import Form from "@/components/common/ui/Form";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import React from "react";
import { Speciality } from "@/Models/Speciality";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { SpecialityService } from "@/services/SpecialityService";
import InputTags from "@/components/common/ui/InputTags";
import { Navigate } from "@/Actions/navigate";
import { useTranslations } from "next-intl";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Gallery from "@/components/common/ui/Gallery";

const SpecialityForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Speciality;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.speciality.create-edit");
  const handleSubmit = async (data: any) => {
    console.log(data);
    if (
      type == "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return await SpecialityService.make<SpecialityService>()
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await SpecialityService.make<SpecialityService>()
        .store(data)
        .then((res) => {
          console.log(res);
          return res;
        });
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
      {type == "update" ? (
        <div className={"col-span-2"}>
          {defaultValues?.image?.length != 0 ? (
            <Gallery
              media={defaultValues?.image ? defaultValues?.image : [""]}
            />
          ) : (
            <div className="flex items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">{t("noData")}</span>
            </div>
          )}
        </div>
      ) : (
        false
      )}
      <div className="my-3">
        <ImageUploader name={"image"} />
      </div>
    </Form>
  );
};

export default SpecialityForm;
