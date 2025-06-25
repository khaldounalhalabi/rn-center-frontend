"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Datepicker from "./Datepicker";

const FormDatepicker = ({
  name,
  label,
  shouldDisableDate,
  onChange,
  df = undefined,
}: {
  name: string;
  label?: string;
  required?: boolean;
  shouldDisableDate?: (day: Dayjs) => boolean;
  onChange?: (date?: Dayjs) => void;
  df?: string;
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={"flex flex-col items-start justify-end gap-1 w-full"}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Datepicker
              onChange={(date) => {
                field.onChange(date?.format("YYYY-MM-DD"));
                if (onChange) {
                  onChange(date ?? undefined);
                }
              }}
              defaultValue={
                df ? dayjs(df) : field?.value ? dayjs(field.value) : dayjs()
              }
              shouldDisableDate={shouldDisableDate}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDatepicker;
