"use client";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import styles from "../../../../app/[locale]/datepicker.module.css";
import React from "react";

const Datepicker = ({
  onChange,
  defaultValue,
  label,
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
  label?: string;
}) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <p>{label ?? ""}</p>
      <DatePicker
        onChange={onChange}
        defaultValue={
          defaultValue ? dayjs(defaultValue, "YYYY-MM-DD") : undefined
        }
        slotProps={{ textField: { size: "small" } }}
        className={styles.datePicker}
      />
    </label>
  );
};

export default Datepicker;
