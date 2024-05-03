"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import React from "react";

const Timepicker = ({
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
      <TimePicker
        onChange={(val): void => {
          setValue(name, val?.format("HH:mm") ?? "");
        }}
        defaultValue={
          defaultValue
            ? dayjs(defaultValue, "HH:mm")
            : dayjs(Date.now(), "HH:mm")
        }
      />
      {error ? <p className="text-error text-sm">{error}</p> : ""}
    </label>
  );
};

export default Timepicker;
