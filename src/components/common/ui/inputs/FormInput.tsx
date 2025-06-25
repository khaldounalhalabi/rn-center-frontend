"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export interface InputProps {
  className?: string | undefined;
  name: string;
  label?: string;
  type?: string;
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
  withError?: boolean;
  autoComplete?: string;
  max?: number;
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
  withError = true,
  autoComplete = undefined,
  max,
}) => {
  const {
    control,
    setValue,
    formState: { defaultValues },
  } = useFormContext();

  const translateUnit = useTranslations("units");
  const t = useTranslations("components");
  const eg = t("eg");
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
              type={type == "year" ? "number" : type}
              required={required}
              step={"any"}
              min={min}
              max={max}
              hidden={hidden}
              defaultValue={defaultValue}
              className={hidden ? "hidden" : ""}
              disabled={hidden}
              placeholder={getPlaceholder(type, label ?? "", eg)}
              autoComplete={autoComplete}
            />
          </FormControl>
          {withError && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default FormInput;

const getPlaceholder = (type: string, label: string, eg: string) => {
  if (type == "text") {
    return `${label} ...`;
  } else if (type == "tel") {
    return `${label} (${eg}: 0912345678)`;
  } else if (type == "month") {
    return `${label} (${eg}: September)`;
  } else if (type == "email") {
    return `${label} (${eg}: example@email.com)`;
  } else if (type == "password") {
    return `${label} (${eg}: P@$$w0rd)`;
  } else if (type == "number") {
    return `${label} (${eg}: 10)`;
  } else if (type == "url") {
    return `${label} (${eg}: https://www.google.com)`;
  } else if (type == "year") {
    return `${label} (${eg}: 1990)`;
  } else {
    return `${label} ...`;
  }
};
