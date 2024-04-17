"use client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { ActualFileObject } from "filepond";

const ImageUploader = ({
  name,
  isMultiple = false,
}: {
  name: string;
  isMultiple: boolean;
}) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType
  );

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div className={`flex justify-center items-center flex-col my-3`}>
      <div className={`w-full`}>
        <FilePond
          onupdatefiles={(fileItems) => {
            if (isMultiple) {
              setValue(
                name,
                fileItems.map((file) => file.file)
              );
            } else {
              fileItems.map((file) => setValue(name, file.file));
            }
          }}
          acceptedFileTypes={["image/*"]}
          labelIdle={"Drag Or Click To Add Image"}
          storeAsFile={true}
          allowMultiple={true}
        />
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default ImageUploader;
