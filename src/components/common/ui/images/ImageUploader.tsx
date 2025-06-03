"use client";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useFormContext } from "react-hook-form";

const ImageUploader = ({
  name,
  isMultiple = false,
  label = undefined,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"],
}: {
  name: string;
  isMultiple?: boolean;
  label?: string;
  acceptedFileTypes?: string[];
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

  useEffect(() => {
    setValue(name, undefined);
  }, []);

  let error = [];
  if (!isMultiple) {
    error = getNestedPropertyValue(errors, `${name}.message`);
  } else {
    for (let i = 0; i <= 10; i++) {
      const tempError = getNestedPropertyValue(errors, `${name}.${i}.message`);
      if (tempError) {
        error = [tempError];
        break;
      }
    }
  }
  return (
    <div className={`my-3 flex flex-col justify-center`}>
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
          acceptedFileTypes={acceptedFileTypes}
          labelIdle={t("image_uploader_placeholder")}
          storeAsFile={true}
          allowMultiple={isMultiple}
        />
      </div>
      {error?.length > 0
        ? error?.map((e: string, index: number) => (
            <p key={index} className={`text-sm text-destructive`}>
              {e}
            </p>
          ))
        : ""}
    </div>
  );
};

export default ImageUploader;
