import MultiSelect from "@/components/common/ui/selects/MultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import React from "react";
import { useFormContext } from "react-hook-form";

interface ISelectProps {
  placeholder?: string;
  options: string[];
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  translated?: boolean;
  name: string;
}

const FormMultiSelect: React.FC<ISelectProps> = ({
  name,
  label,
  options,
  placeholder,
  defaultValues,
  onChange,
  translated,
}) => {
  const form = useFormContext();
  const df =
    defaultValues ??
    getNestedPropertyValue(form.formState.defaultValues, name) ??
    [];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              options={options}
              placeholder={placeholder}
              defaultValues={df}
              onChange={(values) => {
                if (!values) {
                  values = [];
                }
                field.onChange(values);
                if (onChange) {
                  onChange(values);
                }
              }}
              translated={translated}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMultiSelect;
