"use client";
import React, { ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse, ApiResult } from "@/Http/Response";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import LoadingSpin from "@/components/icons/loadingSpin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import DocumentPlus from "@/components/icons/DocumentPlus";
import SearchIcon from "@/components/icons/SearchIcon";

export interface DataTableSchema {
  name?: string;
  label: string;
  headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  cellProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  render?: (
    data: any,
    fullObject?: any
  ) => ReactNode | React.JSX.Element | undefined | null;
}

export interface DataTableData<T> {
  schema: DataTableSchema[];
  api: (
    page?: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    params?: object
  ) => Promise<ApiResult<T>>;
}

const DataTable = (tableData: DataTableData<any>) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["tableData", page, search],
      queryFn: async () => {
        return await tableData.api(page, search);
      },
      placeholderData: keepPreviousData,
    });
  return (
    <>
      <div className={`card`}>
        <div className={`card-body`}>
          <div
            className={`card-actions w-full flex justify-between items-center`}
          >
            <div>
              <button className="btn btn-info">
                <DocumentPlus className={`h-6 w-6`} />
              </button>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <SearchIcon className={`w-4 h-4 opacity-70`} />
            </label>
          </div>
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="relative min-w-full divide-y-2 divide-gray-200 bg-white text-sm overflow-y-hidden scroll-my-0">
                {isPending || isFetching ? (
                  <div className="absolute w-full h-full flex justify-center items-center opacity-70 z-40 left-0 right-0 top-0 m-auto text-center">
                    <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
                  </div>
                ) : null}
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    {tableData.schema.map((header) => (
                      <th
                        key={header.label}
                        className={
                          header.headerProps?.className ??
                          "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        }
                        {...header.headerProps}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {data?.data?.map((item: any, index: any) => (
                    <tr key={`${index}-${item.label}`}>
                      {tableData.schema.map((schema, index) => {
                        if (!schema.render && schema.name) {
                          return (
                            <td
                              key={`${schema.label} - ${index}`}
                              className={
                                schema.cellProps?.className ??
                                "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                              }
                              {...schema.cellProps}
                            >
                              {item[schema.name]}
                            </td>
                          );
                        } else if (schema.render && schema.name) {
                          return (
                            <td
                              key={`${schema.label} - ${index}`}
                              className={
                                schema.cellProps?.className ??
                                "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                              }
                              {...schema.cellProps}
                            >
                              {schema.render(
                                item[schema.name] ?? undefined,
                                item
                              )}
                            </td>
                          );
                        } else if (schema.render) {
                          return (
                            <td
                              key={`${schema.label} - ${index}`}
                              className={
                                schema.cellProps?.className ??
                                "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                              }
                              {...schema.cellProps}
                            >
                              {schema.render(undefined, item)}
                            </td>
                          );
                        } else
                          return (
                            <td
                              key={index}
                              className={
                                schema.cellProps?.className ??
                                "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                              }
                              {...schema.cellProps}
                            ></td>
                          );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <ol className="flex justify-end gap-1 text-xs font-medium">
                <li key={"prev-page"}>
                  <button
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
                  >
                    <span className="sr-only">Prev Page</span>
                    <ChevronLeft />
                  </button>
                </li>

                {[...Array(parseInt(data?.paginate?.total_pages ?? 0))].map(
                  (e, index) => (
                    <li key={`page-${index + 1}`}>
                      <button
                        onClick={() => setPage(index + 1)}
                        className={`block size-8 rounded border border-gray-100 text-center leading-8 text-gray-900 ${index + 1 == data?.paginate?.currentPage ? "bg-info" : "bg-white"}`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
                <li key={"next-page"}>
                  <button
                    onClick={() => {
                      if (!isPlaceholderData && !data?.paginate?.isLast) {
                        setPage((old) => old + 1);
                      }
                    }}
                    disabled={isPlaceholderData && data?.paginate?.isLast}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
                  >
                    <span className="sr-only">Next Page</span>
                    <ChevronRight />
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
