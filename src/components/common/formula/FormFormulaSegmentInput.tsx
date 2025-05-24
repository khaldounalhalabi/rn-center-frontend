"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import SegmentsInput from "@/components/common/formula/SegmentsInput";
import FormulaVariable from "@/models/FormulaVariable";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";

const FormFormulaSegmentInput = ({
  formula,
  name,
  label,
  defaultValue = undefined,
}: {
  formula: string;
  name: string;
  label: string;
  defaultValue?: { segment: string; name: string }[];
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SegmentsInput
              formula={formula}
              onChange={field.onChange}
              defaultValue={defaultValue}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFormulaSegmentInput;
