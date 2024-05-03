"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

const Timepicker = ({ name, label }: { name: string; label?: string }) => {
    const {
        setValue,
        formState: { errors, defaultValues },
    } = useFormContext();



      const error = getNestedPropertyValue(errors, `${name}.message`);
      const defaultValue = getNestedPropertyValue(defaultValues, name);

      return (
          <label className="flex flex-col items-start gap-2 label">
              {label ?? ""}
              <TimePicker
                  onChange={(val): void => {
                     setValue(name, val?.format("HH:MM") ?? "");
                  }}
                  defaultValue={defaultValue ? dayjs(defaultValue) : dayjs()}
              />
              {error ? <p className="text-error text-sm">{error}</p> : ""}
          </label>
      );
};

export default Timepicker;
