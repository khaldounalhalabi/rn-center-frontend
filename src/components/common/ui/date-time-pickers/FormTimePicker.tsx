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
import Timepicker from "./Timepicker";

const FormTimePicker = ({
  name,
  label,
  shouldDisableTime,
  onChange,
  df = undefined,
}: {
  name: string;
  label?: string;
  required?: boolean;
  shouldDisableTime?: (day: Dayjs) => boolean;
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
            <Timepicker
              onChange={(time) => {
                field.onChange(time?.format("HH:mm"));
                if (onChange) {
                  onChange(time ?? undefined);
                }
              }}
              defaultValue={
                df
                  ? dayjs(df, "HH:mm")
                  : field?.value
                    ? dayjs(field.value, "HH:mm")
                    : dayjs()
              }
              shouldDisableTime={shouldDisableTime}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTimePicker;
