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
      <input {...register(`${name}`)} />
      {label && (
        <label className={"label w-fit"}>
          {label == SettingKeysEnum.ContactNumber1
            ? t("ContactNumber1")
            : label == SettingKeysEnum.ContactNumber2
              ? t("ContactNumber2")
              : label == SettingKeysEnum.TermsAndServices
                ? t("TermsAndServices")
                : label == SettingKeysEnum.DaysBeforeExpirationNotification
                  ? t("DaysBefore")
                  : t("ZainCashNumber")}
        </label>
      )}
      <CKEditor
        // @ts-ignore
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: ["undo", "redo", "|", "bold", "italic"],
          },
          plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
          initialData: defaultValue ?? "<p>Put your thoughts here</p>",
        }}
        onChange={(event, editor) => {
          setValue(name, editor.getData());
        }}
      />
    </>
  );
};

export default CKTextEditor;
