"use client";
import React from "react";
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
  hidden?:boolean;
  defaultValue?:string|number|undefined;
}

const FormInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  required = false,
  unit,
  min = 0,
  hidden = false,
  defaultValue = undefined
}) => {
  const { control } = useFormContext();

  const translateUnit = useTranslations("units");

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
              type={type}
              required={required}
              step={"any"}
              min={min}
              defaultValue={defaultValue}
              hidden={hidden}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
