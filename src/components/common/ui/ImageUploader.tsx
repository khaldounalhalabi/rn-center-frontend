"use client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useFormContext } from "react-hook-form";
import React from "react";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { Media } from "@/Models/Media";
import { GET } from "@/Http/QueryFetch";

const ImageUploader = ({ name }: { name: string }) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
  );

  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div className={`flex justify-center items-center flex-col my-3`}>
      <div className={`w-full`}>
        <FilePond
          onupdatefiles={(fileItems) => {
            fileItems.map((file) => setValue(name, file.file));
          }}
          acceptedFileTypes={["image/*"]}
          labelIdle={"Add The Doctor Image Here"}
          storeAsFile={true}
        />
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default ImageUploader;
