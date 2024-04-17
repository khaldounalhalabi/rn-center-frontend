"use client";
import React, { useId } from "react";
import { ApiResponse } from "@/Http/Response";
import { useFormContext } from "react-hook-form";
import "./select.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface SelectProps<T> {
  name: string;
  api: (page: number, search?: string) => Promise<ApiResponse<T[]>>;
  label?: keyof T;
  value?: keyof T;
  isMultiple?: boolean;
  selected?: any[];
  inputLabel?: string;
  getLabel?: (option: T) => any;
  getValue?: (option: T) => any;
}

function SelectPaginated<T>({
  api,
  label,
  value,
  name,
  isMultiple = false,
  inputLabel = undefined,
  selected = [],
  getLabel = undefined,
  getValue = undefined,
}: SelectProps<T>) {
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
    _loadedOptions: ApiResponse<T>,
    { page }: { page: number }
  ) => {
    const response = await api(page, search);
    return {
      options: response.data ?? [
        { label: "There is no data", value: undefined },
      ],
      hasMore: !response?.paginate?.isLast ?? false,
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
        getOptionValue={(option: T) =>
          getValue ? getValue(option) : value && `${option[value]}`
        }
        getOptionLabel={(option: T) =>
          getLabel ? getLabel(option) : label && `${option[label]}`
        }
        additional={{
          page: 1,
        }}
        isSearchable={true}
        isClearable={true}
        onChange={(newValue) => {
          if (!isMultiple) {
            return setValue(
              name,
              value
                ? // @ts-ignore
                  newValue[`${value}`]
                : getValue
                  ? // @ts-ignore
                    getValue(newValue)
                  : undefined
            );
          } else
            return setValue(
              name,
              // @ts-ignore
              newValue?.map((op) => op[`${value ?? ""}`])
            );
        }}
        isOptionSelected={(option: T) =>
          selected.includes(
            value ? option[value] : getValue ? getValue(option) : undefined
          )
        }
      />
      {error ? <p className={`text-error`}>{error}</p> : ""}
    </div>
  );
}

export default SelectPaginated;
