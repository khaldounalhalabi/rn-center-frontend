"use client";
import React, { HTMLProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import Trash from "@/components/icons/Trash";
import { useTranslations } from "next-intl";

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueMultipleInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  maxFields?: number;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  required?: boolean;
}

const KeyValueMultipleInput: React.FC<KeyValueMultipleInputProps> = ({
  name,
  label,
  maxFields = Infinity,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  required = false,
  className,
  ...props
}) => {
  const t = useTranslations("components");
  const {
    setValue,
    formState: { errors, defaultValues },
    register,
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}`);
  const defaultValue = getNestedPropertyValue(defaultValues, name) || [];

  // Initialize with at least one empty field or with defaultValues if available
  const [fields, setFields] = useState<KeyValuePair[]>(
    defaultValue.length > 0 ? defaultValue : [{ key: "", value: "" }],
  );

  // Update form values when fields change
  useEffect(() => {
    setValue(name, fields);
  }, [fields, name, setValue]);

  const addField = () => {
    if (fields.length < maxFields) {
      setFields([...fields, { key: "", value: "" }]);
    }
  };

  const removeField = (index: number) => {
    // Prevent removing the last field if required is true
    if (fields.length === 1 && required) {
      return;
    }

    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (
    index: number,
    fieldType: "key" | "value",
    value: string,
  ) => {
    const newFields = [...fields];
    newFields[index][fieldType] = value;
    setFields(newFields);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label && (
        <label className="label justify-start">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}

      <div className="flex w-full flex-col gap-3">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              {...props}
              className={className || "input input-bordered flex-1"}
              value={field.key}
              placeholder={keyPlaceholder}
              onChange={(e) => updateField(index, "key", e.target.value)}
            />
            <input
              {...props}
              className={className || "input input-bordered flex-1"}
              value={field.value}
              placeholder={valuePlaceholder}
              onChange={(e) => updateField(index, "value", e.target.value)}
            />
            <button
              type="button"
              className="btn btn-square btn-sm"
              onClick={() => removeField(index)}
              disabled={fields.length === 1 && required}
            >
              <Trash className="text-error" />
            </button>
          </div>
        ))}

        {error && <p className="text-sm text-error">{error.message}</p>}

        <div className="self-start">
          <button
            type="button"
            className="btn btn-neutral btn-sm mt-2"
            onClick={addField}
            disabled={fields.length >= maxFields}
          >
            {t("add")} {keyPlaceholder}-{valuePlaceholder}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyValueMultipleInput;
