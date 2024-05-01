"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

const Datepicker = ({ name, label }: { name: string; label?: string }) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  const defaultValue = getNestedPropertyValue(defaultValues, name);

  return (
    <label className="flex flex-col items-start gap-2 label">
      {label ?? ""}
      <DatePicker
        onChange={(val): void => {
          setValue(name, val?.format("YYYY-MM-DD") ?? "");
        }}
        defaultValue={defaultValue ? dayjs(defaultValue) : dayjs()}
      />
      {error ? <p className="text-error text-sm">{error}</p> : ""}
    </label>
  );
};

export default Datepicker;
