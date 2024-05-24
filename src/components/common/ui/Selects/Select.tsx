"use client";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import React from "react";

const Select = ({
  data,
  name,
  selected = [],
  isMultiple = false,
  label = undefined,
  onChange,
  setStatus,
  status,
  required = false,
}: {
  data: any[];
  selected?: any[] | any;
  name?: string;
  isMultiple?: boolean;
  label?: string;
  onChange?: any;
  setStatus?: React.Dispatch<string>;
  status?: string;
  required?: boolean;
}) => {
  const {
    setValue,

    formState: { errors, defaultValues },
  } = useFormContext();
  if (name) {
    const error = getNestedPropertyValue(errors, `${name}.message`);
    const handleSelect = (e: any) => {
      setStatus ? setStatus(e.target.value) : false;
      return setValue(name, e.target.value);
    };

    if (data.includes(defaultValues?.status)) {
      const index = data.indexOf(defaultValues?.status);
      data.splice(index, 1);
      data.unshift(defaultValues?.status);
    }

    return (
      <label className={"label flex flex-col gap-2 w-full items-start"}>
        <p>
          {label ?? ""}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </p>
        <select
          className={"select select-bordered w-full"}
          onChange={handleSelect}
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
  } else {
    return (
      <label className={"label flex flex-col w-10/12 items-start"}>
        <p>
          {label ?? ""}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </p>
        <select
          className={"select select-bordered w-full"}
          defaultValue={selected}
          multiple={isMultiple ?? false}
          onChange={onChange ?? false}
        >
          {data.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }
};

export default Select;