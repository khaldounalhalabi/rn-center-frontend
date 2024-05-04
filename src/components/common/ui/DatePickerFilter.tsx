"use client";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const DatepickerFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: any;
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
