"use client";
import React, { ChangeEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";

export interface InputProps {
  className?: string | undefined;
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  unit?:
    | "IQD"
    | "day"
    | "week"
    | "month"
    | "hour"
    | "sec"
    | "min"
    | "%"
    | undefined
    | string;
  min?: number;
  hidden?: boolean;
  defaultValue?: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  required = false,
  unit,
  min = 0,
  hidden = false,
  defaultValue = undefined,
  onChange = undefined,
}) => {
  const {
    control,
    setValue,
    formState: { defaultValues },
  } = useFormContext();

  const translateUnit = useTranslations("units");
  defaultValue = defaultValue ?? getNestedPropertyValue(defaultValues, name);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {unit && ` (${translateUnit(unit as any)})`}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              onChange={(event) => {
                field.onChange(event);
                if (type == "datetime-local") {
                  setValue(name, event.target?.value?.replace("T", " "));
                }
                if (onChange) {
                  onChange(event);
                }
              }}
              type={type}
              required={required}
              step={"any"}
              min={min}
              hidden={hidden}
              value={defaultValue}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
