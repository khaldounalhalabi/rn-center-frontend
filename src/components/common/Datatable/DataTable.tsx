"use client";
import React, { ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import DocumentPlus from "@/components/icons/DocumentPlus";
import SearchIcon from "@/components/icons/SearchIcon";
import Link from "next/link";
import TableHead from "@/components/common/Datatable/TableHead";
import TableBody from "@/components/common/Datatable/TableBody";
import TablePaginator from "@/components/common/Datatable/TablePaginator";

export interface DataTableSchema<T> {
  name?: string;
  label: string;
  sortable?: boolean;
  headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  cellProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  hidden?: number[];
  render?: (
    data: any,
    fullObject?: T,
    setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void,
  ) => ReactNode | React.JSX.Element | undefined | null;
}

export interface DataTableData<T> {
  title?: string;
  createUrl?: string;
  schema: DataTableSchema<T>[];
  api: (
    page?: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    params?: object,
  ) => Promise<ApiResponse<T>>;
}

const DataTable = (tableData: DataTableData<any>) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hideCols, setHideCols] = useState<number[]>([]);
  const [sortDir, setSortDir]: [
    string,
    (value: ((prevState: string) => string) | string) => void,
  ] = useState("asc");
  const [sortCol, setSortCol] = useState("");

  const { isPending, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["tableData", page, search, sortDir, sortCol],
    queryFn: async () => {
      let s = !search || search == "" ? undefined : search;
      let sortD = !sortDir || sortDir == "" ? undefined : sortDir;
      let sortC = !sortCol || sortCol == "" ? undefined : sortCol;
      return await tableData.api(page, s, sortC, sortD);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className={`relative`}>
      {isPending || isFetching ? (
        <div className="absolute w-full h-full flex justify-center items-center opacity-70 z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto text-center">
          <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
        </div>
      ) : null}
      <div className={`card bg-base-100 shadow-xl m-3`}>
        <div className={`card-body`}>
          {tableData.title ? (
            <h1 className={"card-title"}>{tableData.title}</h1>
          ) : (
            ""
          )}
          <div
            className={`card-actions w-full flex justify-between items-center`}
          >
            <div>
              <Link href={tableData.createUrl ?? "#"}>
                <button className="btn btn-square btn-sm btn-info">
                  <DocumentPlus className={`h-6 w-6`} />
                </button>
              </Link>
            </div>
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <SearchIcon className={`w-4 h-4 opacity-70`} />
            </label>
          </div>
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="relative min-w-full divide-y-2 divide-gray-200 bg-white text-sm overflow-y-hidden scroll-my-0">
                <TableHead
                  schema={tableData.schema}
                  setSortDir={setSortDir}
                  setSortCol={setSortCol}
                  sortDir={sortDir}
                  sortCol={sortCol}
                />

                <TableBody
                  data={data}
                  tableData={tableData}
                  hidden={hideCols}
                  setHidden={setHideCols}
                />
              </table>
            </div>

            <TablePaginator
              key={"next-page"}
              data={data}
              setPage={setPage}
              page={page}
              placeholderData={isPlaceholderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
