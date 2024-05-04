"use client";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const DatepickerFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
}) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <DatePicker
        onChange={onChange}
        defaultValue={
          defaultValue ? dayjs(defaultValue, "YYYY-MM-DD") : dayjs(new Date())
        }
      />
    </label>
  );
};

export default DatepickerFilter;
