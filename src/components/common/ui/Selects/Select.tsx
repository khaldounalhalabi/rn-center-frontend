"use client";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import React, { HTMLProps } from "react";

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string;
  items: string[] | number[] | undefined;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ name, items, label, ...props }) => {
  const {
    setValue,
    formState: { errors, defaultValues },
    register,
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={"flex flex-col items-start w-full"}>
      <label className={"label text-nowrap"}>{label}</label>
      <select
        className={"select select-bordered w-full"}
        {...props}
        {...register(name)}
      >
        {items?.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      {error ? <p className={"text-error"}>{error}</p> : ""}
    </div>
  );
};

export default Select;
