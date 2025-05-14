"use client";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import React, { HTMLProps } from "react";
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

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string;
  items: string[] | number[] | undefined;
  label?: string;
  translatable?: boolean;
  defaultValue?: string;
}

const FormSelect: React.FC<SelectProps> = ({
  name,
  items,
  label,
  translatable = false,
  defaultValue = undefined,
}) => {
  const {
    formState: { defaultValues },
    control,
  } = useFormContext();
  defaultValue = defaultValue ?? getNestedPropertyValue(defaultValues, name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={defaultValue ?? field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={label && `Select a ${label} ...`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((option) => (
                <SelectItem value={`${option}`}>
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
