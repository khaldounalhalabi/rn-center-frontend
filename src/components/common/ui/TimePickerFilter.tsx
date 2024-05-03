"use client";
import { TimePicker } from "@mui/x-date-pickers";

const TimepickerFilter = ({ onChange }: { onChange: any }) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <TimePicker onChange={onChange} />
    </label>
  );
};

export default TimepickerFilter;
