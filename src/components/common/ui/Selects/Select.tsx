"use client";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

const Select = ({
  data,
  name,
  selected = [],
  isMultiple = false,
  label = undefined,
}: {
  data: any[];
  selected?: any[] | any;
  name: string;
  isMultiple?: boolean;
  label?: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <label className={"label flex flex-col w-full items-start"}>
      {label ?? ""}
      <select
        className={"select select-bordered w-full"}
        defaultValue={selected}
        {...register(name)}
        multiple={isMultiple ?? false}
      >
        {data.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      {error ? <p className={"text-error"}>{error}</p> : ""}
    </label>
  );
};

export default Select;
