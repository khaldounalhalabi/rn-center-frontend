"use client";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { DateTimePicker, PickerValidDate } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import React from "react";
import styles from "./datepicker.module.css";

const FormDateTimePicker = ({
  name,
  label,
  required = false,
  shouldDisableDate,
}: {
  name: string;
  label?: string;
  required?: boolean;
  shouldDisableDate?: (day: PickerValidDate) => boolean;
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  const defaultValue = getNestedPropertyValue(defaultValues, name);

  return (
    <label className="label flex flex-col items-start gap-2">
      <p>
        {label ?? ""}
        {required ? <span className="ml-1 text-red-600">*</span> : false}
      </p>
      <DateTimePicker
        onChange={(val): void => {
          setValue(name, val?.format("YYYY-MM-DD hh:mm") ?? "");
        }}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        className={styles.datePicker}
        shouldDisableDate={shouldDisableDate ?? undefined}
      />
      {error ? <p className="text-sm text-error">{error}</p> : ""}
    </label>
  );
};

export default FormDateTimePicker;
