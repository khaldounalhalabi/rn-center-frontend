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

const CKTextEditor = ({
  label,
  name,
  defaultValue,
}: {
  label?: string;
  name: string;
  defaultValue?: string;
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  return (
    <>
      <input {...register(`${name}`)} />
      {label && <label className={"label w-fit"}>{label}</label>}
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
