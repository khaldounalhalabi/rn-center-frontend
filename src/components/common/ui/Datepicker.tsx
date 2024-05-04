"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import React from "react";

const Datepicker = ({
  name,
  label,
  required = false,
}: {
  name: string;
  label?: string;
  required?: boolean;
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  const defaultValue = getNestedPropertyValue(defaultValues, name);

  return (
    <label className="flex flex-col items-start gap-2 label">
      <p>
        {label ?? ""}
        {required ? <span className="ml-1 text-red-600">*</span> : false}
      </p>
      <DatePicker
        onChange={(val): void => {
          setValue(name, val?.format("YYYY-MM-DD") ?? "");
        }}
        defaultValue={defaultValue ? dayjs(defaultValue) : dayjs(new Date())}
      />
      {error ? <p className="text-error text-sm">{error}</p> : ""}
    </label>
  );
};

export default Datepicker;
