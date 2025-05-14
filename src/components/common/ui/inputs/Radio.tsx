"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/shadcn/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";

interface RadioOption {
  label: string | React.ReactNode;
  value: string;
}

interface RadioProps {
  name: string;
  options: RadioOption[];
  label?: string;
  className?: string;
  defaultChecked?: ((value: string) => boolean) | string;
}

const Radio: React.FC<RadioProps> = ({
  name,
  options,
  label,
  defaultChecked = undefined,
}) => {
  const {
    control,
    formState: { errors, defaultValues },
    setValue,
  } = useFormContext();

  const defaultValue = getNestedPropertyValue(defaultValues, name);

  const df = options.map((option) => {
    if (defaultChecked) {
      if (typeof defaultChecked == "string") {
        return { ...option, checked: option.value == defaultChecked };
      } else {
        return { ...option, checked: defaultChecked(option.value) };
      }
    }
    return { ...option, checked: option.value == defaultValue };
  });

  useEffect(() => {
    options.forEach((option) => {
      if (defaultChecked) {
        if (typeof defaultChecked == "string") {
          if (option.value == defaultChecked) {
            setValue(name, option.value);
          }
        } else {
          if (defaultChecked(option.value)) {
            setValue(name, option.value);
          }
        }
      } else {
        if (option.value == defaultValue) {
          setValue(name, option.value);
        }
      }
    });
  }, [defaultValue, name, setValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"flex flex-col justify-center gap-3"}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={df?.filter(i => i.checked)?.[0]?.value ?? field.value}
              className={"flex items-center gap-2"}
            >
              {df.map((option) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Radio;
