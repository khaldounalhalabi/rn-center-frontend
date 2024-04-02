"use client";
import React, { useId } from "react";
import { ApiResponse } from "@/Http/Response";
import { useFormContext } from "react-hook-form";
import "./select.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { getNestedPropertyValue, translate } from "@/Helpers/ObjectHelpers";

interface SelectProps<T> {
  name: string;
  api: (page: number, search?: string) => Promise<ApiResponse<T>>;
  label: string;
  value: string;
  isMultiple?: boolean;
  selected?: any[];
  inputLabel?: string;
}

const SelectPaginated: React.FC<SelectProps<any>> = ({
  api,
  label,
  value,
  name,
  isMultiple = false,
  inputLabel = undefined,
  selected = [],
}) => {
  if (!selected) {
    selected = [];
  }

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  const loadedOptions = async (
    search: string,
    _loadedOptions: ApiResponse<any>,
    { page }: { page: number },
  ) => {
    const response = await api(page, search);
    return {
      options:
        response && response.hasOwnProperty("data")
          ? response.data
          : [{ label: "There is no data", value: undefined }],
      hasMore:
        response && response.hasOwnProperty("paginate")
          ? !response?.paginate?.isLast
          : false,
      additional: {
        page: page + 1,
      },
    };
  };
  return (
    <div className={"flex flex-col w-full"}>
      {inputLabel ? <label className={"label"}>{inputLabel}</label> : ""}
      <input {...register(name)} className={"hidden"} hidden={true} />
      <AsyncPaginate
        cacheOptions
        instanceId={useId()}
        // @ts-ignore
        loadOptions={loadedOptions}
        isMulti={isMultiple}
        // @ts-ignore
        getOptionValue={(option) => `${option[`${value}`]}`}
        // @ts-ignore
        getOptionLabel={(option) => translate(option[`${label}`])}
        additional={{
          page: 1,
        }}
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
        isOptionSelected={(option) =>
          // @ts-ignore
          selected.includes(option[`${value ?? ""}`])
        }
      />
      {error ? <p className={`text-error`}>{error}</p> : ""}
    </div>
  );
};

export default SelectPaginated;
