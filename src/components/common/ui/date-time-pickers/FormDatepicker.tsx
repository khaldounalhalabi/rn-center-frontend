"use client";
import dayjs, { Dayjs } from "dayjs";
import { useFormContext } from "react-hook-form";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/shadcn/calendar";

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
  onChange?: (date: Dayjs) => void;
  df?: string;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"flex flex-col items-start justify-end gap-1 w-full"}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "ps-3 text-start font-normal w-full",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      dayjs(df ?? field.value).format("YYYY-MM-DD")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    df ? dayjs(df).toDate() : dayjs(field.value).toDate()
                  }
                  onSelect={(val) => {
                    field.onChange(dayjs(val).format("YYYY-MM-DD"));
                    if (onChange) {
                      onChange(dayjs(val));
                    }
                  }}
                  disabled={(date) => {
                    if (shouldDisableDate) {
                      return shouldDisableDate(dayjs(date));
                    }
                    return false;
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDatepicker;
