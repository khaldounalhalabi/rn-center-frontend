import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

const InputTags = ({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label?: string;
  defaultValue?: string[];
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  let df: string[];
  if (defaultValue) {
    df = defaultValue;
  } else {
    const middleDf = getNestedPropertyValue(defaultValues, name) as string;
    df = middleDf?.split(",") ?? [];
  }

  const [tags, setTags] = useState<string[]>(df);

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div>
      {label ? <label className="label">{label}</label> : false}
      <TagsInput
        isEditOnRemove={true}
        value={tags}
        onChange={(values) => {
          setValue(name, values.toString());
          setTags(values);
        }}
        name="fruits"
        placeHolder="Press Enter After Every Tag To Add It"
      />
      {error ? <p className="text-error text-sm">{error}</p> : ""}
    </div>
  );
};

export default InputTags;
