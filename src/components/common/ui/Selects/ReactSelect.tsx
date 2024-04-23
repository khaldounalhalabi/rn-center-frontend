"use client";
import React, { useId } from "react";
import { ApiResponse } from "@/Http/Response";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import AsyncSelect from "react-select/async";

interface SelectProps<T> {
  name: string;
  api: () => Promise<ApiResponse<T>>;
  label: string;
  value: string;
  isMultiple?: boolean;
  selected?: any[];
  inputLabel?: string;
}

const ReactSelect: React.FC<SelectProps<any>> = ({
  api,
  label,
  value,
  name,
  isMultiple = false,
  inputLabel = undefined,
  selected = [],
}) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  if (selected.length > 0) {
    if (isMultiple) {
      setValue(name, selected);
    } else setValue(name, selected[0]);
  }
  const loadedOptions = api().then((data) => {
    return data.data;
  });
  return (
    <div className={"flex flex-col w-full"}>
      {inputLabel ? <label className={"label"}>{inputLabel}</label> : ""}
      <input {...register(name)} className={"hidden"} hidden={true} />
      <AsyncSelect
        cacheOptions
        instanceId={useId()}
        // @ts-ignore
        loadOptions={loadedOptions}
        isMulti={isMultiple}
        // @ts-ignore
        getOptionValue={(option) => `${option[`${value}`]}`}
        // @ts-ignore
        getOptionLabel={(option) => option[`${label}`]}
        isSearchable={true}
        isClearable={true}
        onChange={(newValue) => {
          if (!isMultiple) {
            // @ts-ignore
            return setValue(name, newValue[`${value ?? ""}`] ?? undefined);
          } else
            return setValue(
              name,
              // @ts-ignore
              newValue?.map((op) => op[`${value ?? ""}`]),
            );
        }}
        defaultOptions={[
          { value: "chocolate", label: "Chocolate" },
          { value: "strawberry", label: "Strawberry" },
          { value: "vanilla", label: "Vanilla" },
        ]}
      />
      {error ? <p className={`text-error`}>{error}</p> : ""}
    </div>
  );
};

export default ReactSelect;
