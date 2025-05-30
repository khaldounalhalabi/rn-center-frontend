"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Label } from "../labels-and-values/Label";
import dayjs, { Dayjs } from "dayjs";

const Datepicker = ({
  onChange,
  defaultValue,
  label,
  col = true
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
  label?: string;
  col?:boolean
}) => {
  const [date, setDate] = useState<Dayjs | undefined>(dayjs(defaultValue));
  const [open , setOpen] = useState(false);
  return (
    <Label col={col} label={label}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date ? date?.format("YYYY-MM-DD") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="single"
            selected={date?.toDate()}
            onSelect={(value) => {
              if (onChange) {
                onChange(dayjs(value));
              }
              setDate(dayjs(value))
              setOpen(false)
            }}
            initialFocus
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </Label>
  );
};

export default Datepicker;
