"use client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useFormContext } from "react-hook-form";

const ImageUploader = ({ name }: { name: string }) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
  );

  const { setValue } = useFormContext();

  return (
    <div className={`flex justify-center items-center`}>
      <div className={`w-full`}>
        <FilePond
          onupdatefiles={(fileItems) => {
            fileItems.map((file) => setValue(name, file));
          }}
          acceptedFileTypes={["image/*"]}
          labelIdle={"Add The Doctor Image Here"}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
