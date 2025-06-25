"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import dayjs, { Dayjs } from "dayjs";
import { useFormContext } from "react-hook-form";
import DateTimePickerComponent from "./DateTimePicker";

const FormDateTimePicker = ({
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
            <DateTimePickerComponent
              onChange={(date) => {
                field.onChange(date?.format("YYYY-MM-DD HH:mm"));
                if (onChange) {
                  onChange(date ?? undefined);
                }
              }}
              defaultValue={
                df
                  ? dayjs(df, "YYYY-MM-DD HH:mm")
                  : field?.value
                    ? dayjs(field.value, "YYYY-MM-DD HH:mm")
                    : dayjs()
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

export default FormDateTimePicker;
