"use client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useFormContext } from "react-hook-form";
import React from "react";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { useTranslations } from "next-intl";

const ImageUploader = ({
  name,
  isMultiple = false,
  label = undefined,
}: {
  name: string;
  isMultiple?: boolean;
  label?: string;
}) => {
  const t = useTranslations("components");
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
  );

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div className={`flex justify-center  flex-col my-3`}>
      {label ? <label className={"label"}>{label} :</label> : ""}
      <div className={`w-full`}>
        <FilePond
          onupdatefiles={(fileItems) => {
            if (isMultiple) {
              setValue(
                name,
                fileItems.length > 0
                  ? fileItems.map((file) => file.file)
                  : null,
              );
            } else {
              fileItems.length > 0
                ? fileItems.map((file) => setValue(name, file.file))
                : "";
            }
          }}
          acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
          labelIdle={t("image_uploader_placeholder")}
          storeAsFile={true}
          allowMultiple={isMultiple}
        />
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default ImageUploader;
