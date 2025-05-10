"use client";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import styles from "../../../../app/[locale]/datepicker.module.css";

const DateTimePickerRangFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
}) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <DateTimePicker
        onChange={onChange}
        defaultValue={
          defaultValue ? dayjs(defaultValue, "YYYY-MM-DD hh:mm") : undefined
        }
        slotProps={{ textField: { size: "small" } }}
        className={styles.datePicker}
      />
    </label>
  );
};

export default DateTimePickerRangFilter;
