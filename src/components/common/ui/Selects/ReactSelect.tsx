"use client";
import React, { useEffect, useState } from "react";
import { ApiResponsePagination, ApiResult } from "@/Http/Response";
import { useFormContext } from "react-hook-form";
import "./select.css";
import dynamic from "next/dynamic";

interface SelectProps<T> {
  name: string;
  api: (page: number, search?: string) => Promise<ApiResult<T>>;
  label: string;
  value: string;
  isMultiple?: boolean;
}

const ReactSelect: React.FC<SelectProps<any>> = ({
  api,
  label,
  value,
  name,
  isMultiple = false,
}) => {
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const { setValue, register } = useFormContext();

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [paginate, setPaginate] = useState<ApiResponsePagination>();

  useEffect(() => {
    setIsLoading(true);
    api(page).then((res: ApiResult<any[]>) => {
      // @ts-ignore
      const newData = (res ?? { data: [] })?.data ?? [];
      // @ts-ignore
      if (!newData.some((d: any) => data.includes(d))) {
        // @ts-ignore
        setData((prevState) => [...prevState, ...newData]);
        setPaginate(res?.paginate ?? {});
        setIsLoading(false);
      }
    });
  }, [page]);

  return (
    <>
      <input {...register(name)} className={"hidden"} hidden={true} />
      <Select
        id={Date.now().toString()}
        isMulti={isMultiple}
        isLoading={isLoading}
        options={data}
        // @ts-ignore
        getOptionValue={(option) => `${option[`${value}`]}`}
        // @ts-ignore
        getOptionLabel={(option) => option[`${label}`]}
        onMenuScrollToBottom={() =>
          setPage(() => {
            if (paginate?.isLast) {
              return paginate.currentPage;
            } else return (paginate?.currentPage ?? 0) + 1;
          })
        }
        isSearchable={true}
        isClearable={true}
        onChange={(newValue) => {
          if (!isMultiple) {
            // @ts-ignore
            return setValue(name, newValue[`${value}`] ?? undefined);
          } else
            return setValue(
              name,
              // @ts-ignore
              newValue?.map((op) => op[`${value}`]),
            );
        }}
      />
    </>
  );
};

export default ReactSelect;
