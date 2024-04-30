"use client";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

const Timepicker = ({ name, label ,onChange}: { name?: string; label?: string,onChange?:any }) => {
    const {
        setValue,
        formState: { errors, defaultValues },
    } = useFormContext();
  if(name){


      const error = getNestedPropertyValue(errors, `${name}.message`);
      const defaultValue = getNestedPropertyValue(defaultValues, name);

      return (
          <label className="flex flex-col items-start gap-2 label">
              {label ?? ""}
              <TimePicker
                  onChange={(val): void => {
                      setValue(name, val?.format("HH:mm") ?? "");
                  }}
                  defaultValue={defaultValue ? dayjs(defaultValue) : dayjs()}
              />
              {error ? <p className="text-error text-sm">{error}</p> : ""}
          </label>
      );
  }else {

      return (
          <label className="flex flex-col items-start gap-2 label">
              {label ?? ""}
              <TimePicker
                  onChange={onChange}

              />

          </label>
      );
  }
};

export default Timepicker;
