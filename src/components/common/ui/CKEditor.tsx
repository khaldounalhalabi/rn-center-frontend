import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Bold,
  ClassicEditor,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { useFormContext } from "react-hook-form";
import React from "react";
import { SettingKeysEnum } from "@/enum/SettingKeysEnum";
import { useTranslations } from "next-intl";

const CKTextEditor = ({
  label,
  name,
  defaultValue,
}: {
  label?: string;
  name: string;
  defaultValue?: string;
}) => {
  const t = useTranslations("admin.setting");
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  return (
    <>
      <input {...register(`${name}`)} hidden={true} />
      {label && <label className={"label w-fit"}>{label}</label>}
      <CKEditor
        // @ts-ignore
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: ["undo", "redo", "|", "bold", "italic"],
          },
          plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
          initialData: defaultValue ?? "",
        }}
        onChange={(event, editor) => {
          setValue(name, editor.getData());
        }}
      />
    </>
  );
};

export default CKTextEditor;
