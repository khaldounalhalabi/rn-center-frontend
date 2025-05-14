"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Trash } from "lucide-react";
import {
  getNestedPropertyValue,
  sanitizeString,
} from "@/helpers/ObjectHelpers";
import { useFormContext } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

interface MultiInputProps
  extends React.ForwardRefExoticComponent<
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "ref"
    >
  > {
  name: string;
  maxFields?: number;
  className?: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const MultiInput: React.FC<MultiInputProps> = ({
  className,
  label,
  name,
  type,
  required = false,
  maxFields = Infinity,
  ...props
}) => {
  const locale = useLocale();
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}`);
  let defaultValue = getNestedPropertyValue(defaultValues, name) ?? [];
  const t = useTranslations("components");

  const [inputs, setInputs] = useState<any[]>(
    defaultValue.length ? defaultValue : [""],
  );

  const handleInputChange = (index: number, value: any) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < maxFields) {
      setInputs([...inputs, ""]);
    }
  };

  const removeInput = (value: any) => {
    const index = inputs.indexOf(value);
    const temp = inputs;
    if (index > -1) {
      temp.splice(index, 1);
    }
    setInputs([...temp]);
  };

  useEffect(() => {
    setValue(name, inputs);
  }, [inputs, name, setValue]);

  return (
    <>
      {label && (
        <Label className="flex items-center">
          {label}
          {error && (
            <p className="ml-2 text-sm text-red-600">{error.message}</p>
          )}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {inputs.map((field: any, index: number) => (
          <div className="flex flex-col items-start" key={index}>
            <div className="flex w-full items-center gap-2">
              <Input
                key={`input-${index}`}
                type={type}
                className={`${className || "flex-1"} ${error ? "border-red-600" : ""}`}
                {...props}
                defaultValue={field ?? ""}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(index, e.target.value);
                }}
              />
              {index !== 0 || !required ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInput(field)}
                  className="p-2 text-red-600"
                >
                  <Trash size={16} />
                </Button>
              ) : null}
            </div>
            {error && Array.isArray(error) && error[index] && (
              <p className="mt-1 text-sm text-red-600">
                {error[index].message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addInput}
          disabled={inputs.length >= maxFields}
        >
          {t("add")} {locale === "en" ? "new" : ""}{" "}
          {sanitizeString(name) || "input"}
        </Button>
      </div>
    </>
  );
};

export default MultiInput;
