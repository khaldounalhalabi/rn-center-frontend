"use client";
import { DatePicker } from "@mui/x-date-pickers";

const DatepickerFilter = ({ onChange }: { onChange: any }) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <DatePicker onChange={onChange} />
    </label>
  );
};

export default DatepickerFilter;
