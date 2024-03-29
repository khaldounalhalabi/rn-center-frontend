"use client";
import React, { useId } from "react";
import { ApiResult } from "@/Http/Response";
import { useFormContext } from "react-hook-form";
import "./select.css";
import { AsyncPaginate } from "react-select-async-paginate";

interface SelectProps<T> {
  name: string;
  api: (page: number, search?: string) => Promise<ApiResult<T>>;
  label: string;
  value: string;
  isMultiple?: boolean;
  selected?: any[];
}

const ReactSelect: React.FC<SelectProps<any>> = ({
  api,
  label,
  value,
  name,
  isMultiple = false,
  selected = [],
}) => {
  const { setValue, register } = useFormContext();

  if (selected.length > 0) {
    if (isMultiple) {
      setValue(name, selected);
    } else setValue(name, selected[0]);
  }
  const loadedOptions = async (
    search: string,
    _loadedOptions: ApiResult<any>,
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
          ? // @ts-ignore
            !response?.paginate.isLast
          : false,
      additional: {
        page: page + 1,
      },
    };
  };
  return (
    <>
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
        getOptionLabel={(option) => option[`${label}`]}
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
    </>
  );
};

export default ReactSelect;
