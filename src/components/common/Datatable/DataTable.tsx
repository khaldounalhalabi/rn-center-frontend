"use client";
import React, { Fragment, ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import DocumentPlus from "@/components/icons/DocumentPlus";
import SearchIcon from "@/components/icons/SearchIcon";
import Link from "next/link";
import TableHead from "@/components/common/Datatable/TableHead";
import TableBody from "@/components/common/Datatable/TableBody";
import TablePaginator from "@/components/common/Datatable/TablePaginator";
import FilterIcon from "@/components/icons/FilterIcon";
import { Dialog, Transition } from "@headlessui/react";

export interface FilterParam {
  [key: string]: any;
}

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
    perPage?: number,
    params?: object,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  filter?: (
    params: FilterParam,
    setParams: (
      value: ((prevState: FilterParam) => FilterParam) | FilterParam,
    ) => void,
  ) => ReactNode | React.JSX.Element | undefined | null;
}

const DataTable = (tableData: DataTableData<any>) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hideCols, setHideCols] = useState<number[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [sortDir, setSortDir] = useState("asc");
  const [sortCol, setSortCol] = useState("");

  const { isPending, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: [
      "tableData",
      page,
      search,
      sortDir,
      sortCol,
      perPage,
      params,
    ],
    queryFn: async () => {
      let s = !search || search == "" ? undefined : search;
      let sortD = !sortDir || sortDir == "" ? undefined : sortDir;
      let sortC = !sortCol || sortCol == "" ? undefined : sortCol;
      return await tableData.api(page, s, sortC, sortD, perPage, params);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <>
      {tableData.filter ? (
        <Transition appear show={openFilter} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setOpenFilter(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Filters
                    </Dialog.Title>
                    <div className="mt-2">
                      {tableData.filter(params, setParams)}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setOpenFilter(false)}
                      >
                        Ok
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        ""
      )}
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
              <div className={"flex gap-1"}>
                <Link href={tableData.createUrl ?? "#"}>
                  <button className="btn btn-square btn-sm btn-info">
                    <DocumentPlus className={`h-6 w-6`} />
                  </button>
                </Link>
                {tableData?.filter ? (
                  <div>
                    <button
                      className="btn btn-square btn-sm btn-info"
                      onClick={() => setOpenFilter((prevState) => !prevState)}
                    >
                      <FilterIcon />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={"flex gap-2"}>
                <select
                  className="select select-bordered select-sm w-full max-w-xs"
                  onChange={(e) => setPerPage(parseInt(e.target.value))}
                  value={perPage}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={75}>75</option>
                  <option value={data?.paginate?.total}>All</option>
                </select>
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
    </>
  );
};

export default DataTable;
