"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import { Setting } from "@/Models/setting";
import { SettingService } from "@/services/SettingService";
import {
  EditorRequiredSettings,
  SettingKeysEnum,
} from "@/enum/SettingKeysEnum";
import CKTextEditor from "@/components/common/ui/CKEditor";
import { useTranslations } from "next-intl";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Gallery from "@/components/common/ui/Gallery";

const SettingForm = ({ defaultValues }: { defaultValues: Setting }) => {
  const t = useTranslations("admin.setting");
  const handleSubmit = async (data: any) => {
    return await SettingService.make<SettingService>("admin")
      .update(defaultValues?.id, data)
      .then((res) => {
        if (res.code == 200) {
          Navigate(`/admin/setting`);
        }
        return res;
      });
  };
  const { image, ...res } = defaultValues ?? { image: "no Data" };
  return (
    <Form handleSubmit={handleSubmit} defaultValues={res}>
      {EditorRequiredSettings.includes(defaultValues.label) ? (
        <CKTextEditor
          name={"value"}
          label={defaultValues?.label?.replace(/_/g, " ")}
          defaultValue={defaultValues ? defaultValues?.value : undefined}
        />
      ) : SettingKeysEnum.ZainCashQr === defaultValues.label ? (
        <>
          <div className={"col-span-2"}>
            {defaultValues?.image?.length != 0 ? (
              <Gallery
                media={defaultValues?.image ? defaultValues?.image : [""]}
              />
            ) : (
              <div className="flex items-center">
                <label className="label"> {t("image")} : </label>
                <span className="text-lg badge badge-neutral">
                  {t("noData")}
                </span>
              </div>
            )}
          </div>
          <ImageUploader name={"image"} label={t("image")} />
        </>
      ) : (
        <Grid md={2}>
          <Input
            required={true}
            name={"value"}
            label={defaultValues?.label?.replace(/_/g, " ")}
            placeholder={"value ...."}
            type="text"
            defaultValue={defaultValues ? defaultValues?.value : undefined}
          />
        </Grid>
      )}
    </Form>
  );
};

export default SettingForm;
