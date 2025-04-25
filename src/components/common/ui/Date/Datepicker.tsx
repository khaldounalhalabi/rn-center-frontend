"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { DatePicker, PickerValidDate } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import styles from "../../../../app/[locale]/datepicker.module.css";

const Datepicker = ({
  name,
  label,
  required = false,
  shouldDisableDate,
  onChange,
  df = undefined,
}: {
  name: string;
  label?: string;
  required?: boolean;
  shouldDisableDate?: (day: PickerValidDate) => boolean;
  onChange?: (date: Dayjs | null) => void;
  df?: string;
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  const defaultValue = df ?? getNestedPropertyValue(defaultValues, name);

  return (
    <label className="flex flex-col items-start gap-2 label">
      <p>
        {label ?? ""}
        {required ? <span className="ml-1 text-red-600">*</span> : false}
      </p>
      <DatePicker
        onChange={(val): void => {
          setValue(name, val?.format("YYYY-MM-DD") ?? "");
          if (onChange) {
            onChange(val);
          }
        }}
        defaultValue={dayjs(defaultValue)}
        // slotProps={{ textField: { size: 'small' } }}
        className={styles.datePicker}
        shouldDisableDate={shouldDisableDate ?? undefined}
      />
      <p className="text-error text-sm min-h-5">{error}</p>
    </label>
  );
};

export default Datepicker;
