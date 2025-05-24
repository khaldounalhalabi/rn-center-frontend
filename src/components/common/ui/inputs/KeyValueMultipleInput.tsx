"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { useTranslations } from "next-intl";

interface KeyValuePair {
  [key: string]: string;
}

interface KeyValueMultipleInputProps {
  name: string;
  label?: string;
  maxFields?: number;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  required?: boolean;
  keyName?: string;
  valueName?: string;
  keyDefaultValue?: string;
  valueDefaultValue?: string;
  className?: string;
}

const KeyValueMultipleInput: React.FC<KeyValueMultipleInputProps> = ({
  name,
  label,
  maxFields = Infinity,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  required = false,
  keyName = "key",
  valueName = "value",
  keyDefaultValue = "",
  valueDefaultValue = "",
  className,
}) => {
  const t = useTranslations("components");
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}`);
  const defaultValueList = getNestedPropertyValue(defaultValues, name) || [];

  const [fields, setFields] = useState<KeyValuePair[]>(
    defaultValueList.length > 0
      ? defaultValueList
      : [{ [keyName]: keyDefaultValue, [valueName]: valueDefaultValue }],
  );

  useEffect(() => {
    setValue(name, fields);
  }, [fields, name, setValue]);

  const addField = () => {
    if (fields.length < maxFields) {
      setFields([
        ...fields,
        { [keyName]: keyDefaultValue, [valueName]: valueDefaultValue },
      ]);
    }
  };

  const removeField = (index: number) => {
    if (fields.length === 1 && required) {
      return;
    }

    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (index: number, fieldType: string, value: string) => {
    const newFields = [...fields];
    newFields[index][fieldType] = value;
    setFields(newFields);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label && (
        <Label className="flex items-center">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label>
      )}

      <div className="flex w-full flex-col gap-3">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              className={className || "flex-1"}
              value={field[keyName] || ""}
              placeholder={keyPlaceholder}
              onChange={(e) => updateField(index, keyName, e.target.value)}
            />
            <Input
              className={className || "flex-1"}
              value={field[valueName] || ""}
              placeholder={valuePlaceholder}
              onChange={(e) => updateField(index, valueName, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeField(index)}
              disabled={fields.length === 1 && required}
            >
              <Trash />
            </Button>
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error.message}</p>}

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={addField}
          disabled={fields.length >= maxFields}
        >
          {t("add")} {keyPlaceholder}-{valuePlaceholder}
        </Button>
      </div>
    </div>
  );
};

export default KeyValueMultipleInput;
