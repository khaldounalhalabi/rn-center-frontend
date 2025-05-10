"use client";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import styles from "./datepicker.module.css";

const Timepicker = ({
  onChange,
  defaultValue,
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
}) => {
  return (
    <label className="label flex w-full flex-col items-start gap-2">
      <TimePicker
        onChange={onChange}
        defaultValue={defaultValue ? dayjs(defaultValue, "HH:mm") : undefined}
        slotProps={{ textField: { size: "small" } }}
        className={styles.datePicker}
      />
    </label>
  );
};

export default Timepicker;
