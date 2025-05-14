import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Textarea } from "@/components/ui/shadcn/textarea";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
  defaultValue?: any;
  required?: boolean;
}

const FormTextarea: React.FC<textAreaType> = ({
  label,
  name,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
