"use client";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const TimepickerFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: (v: Dayjs | null) => void;
  defaultValue?: string;
}) => {
  return (
    <label className="flex flex-col items-start gap-2 label">
      <TimePicker
        onChange={onChange}
        defaultValue={
          defaultValue ? dayjs(defaultValue, "HH:mm") : dayjs(new Date())
        }
      />
    </label>
  );
};

export default TimepickerFilter;
