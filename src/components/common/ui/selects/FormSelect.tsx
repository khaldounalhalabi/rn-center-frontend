"use client";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps {
  name: string;
  items: string[] | number[] | undefined;
  label?: string;
  translatable?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const FormSelect: React.FC<SelectProps> = ({
  name,
  items,
  label,
  translatable = false,
  defaultValue = undefined,
  onChange = undefined,
}) => {
  const {
    formState: { defaultValues },
    control,
  } = useFormContext();
  defaultValue = defaultValue ?? getNestedPropertyValue(defaultValues, name);
  const t = useTranslations("components");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(v) => {
              field.onChange(v);
              if (onChange) {
                onChange(v);
              }
            }}
            defaultValue={defaultValue ?? field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={label && `${t("select")} ${label} ...`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {defaultValue && !items?.includes(defaultValue as never) && (
                <SelectItem value={`${defaultValue}`}>
                  {defaultValue}
                </SelectItem>
              )}
              {items?.map((option, index) => (
                <SelectItem value={`${option}`} key={index}>
                  {translatable ? (
                    <TranslatableEnum value={`${option}`} />
                  ) : (
                    option
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
