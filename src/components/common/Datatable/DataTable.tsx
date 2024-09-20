"use client";
import React, { Fragment, ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DocumentPlus from "@/components/icons/DocumentPlus";
import SearchIcon from "@/components/icons/SearchIcon";
import { Link } from "@/navigation";
import TableHead from "@/components/common/Datatable/TableHead";
import TableBody from "@/components/common/Datatable/TableBody";
import TablePaginator from "@/components/common/Datatable/TablePaginator";
import FilterIcon from "@/components/icons/FilterIcon";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

export interface FilterParam {
  [key: string]: any;
}

export interface DataTableSchema<T> {
  name?: string;
  label: string;
  sortable?: boolean;
  translatable?: boolean;
  headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  cellProps?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  hidden?: number[];
  render?: (
    data: any,
    fullObject?: T,
    setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void,
    revalidate?: () => void
  ) => ReactNode | React.JSX.Element | undefined | null;
}

export interface DataTableData<T> {
  extraButton?: any;
  title?: string;
  createUrl?: string;
  schema: DataTableSchema<T>[];
  api: (
    page?: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    perPage?: number,
    params?: object
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  filter?: (
    params: FilterParam,
    setParams: (
      value: ((prevState: FilterParam) => FilterParam) | FilterParam
    ) => void
  ) => ReactNode | React.JSX.Element | undefined | null;
}

const DataTable = (tableData: DataTableData<any>) => {
  const t = useTranslations("table");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hideCols, setHideCols] = useState<number[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({});
  const [tempParams, setTempParams] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [sortDir, setSortDir] = useState("asc");
  const [sortCol, setSortCol] = useState("");
  const queryClient = useQueryClient();

  const revalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [`tableData_${tableData.createUrl}_${tableData.title}`],
    });
  };
  const { isPending, data, isPlaceholderData, isRefetching, refetch } =
    useQuery({
      queryKey: [
        `tableData_${tableData.createUrl}_${tableData.title}`,
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
        return await tableData
          .api(page, s, sortC, sortD, perPage, params)
          .then((res) => {
            return res;
          });
      },
      refetchOnWindowFocus: false,
      retry: 10,
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
              <div className="flex justify-center items-center p-4 min-h-full text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle">
                    <Dialog.Title
                      as="h3"
                      className="font-medium text-gray-900 text-lg leading-6"
                    >
                      {t("filters")}
                    </Dialog.Title>
                    <div className="mt-2">
                      {tableData.filter(tempParams, setTempParams)}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center bg-blue-100 hover:bg-blue-200 px-4 py-2 border border-transparent rounded-md font-medium text-blue-900 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setParams(tempParams);
                          setOpenFilter(false);
                        }}
                      >
                        {t("apply")}
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center bg-error hover:bg-red-600 px-4 py-2 border border-transparent rounded-md font-medium text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setTempParams({});
                          setParams({});
                          setOpenFilter(false);
                        }}
                      >
                        {t("resetFilters")}
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
              {tableData.createUrl ? (
                <Link href={tableData.createUrl ?? "#"}>
                  <button className="p-2  rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] hover:bg-[#1fb8b9]" >
                    <DocumentPlus className={`h-6 w-6`} />
                  </button>
                </Link>
              ) : (
                ""
              )}
              {tableData?.filter ? (
                <div>
                  <button
                    className="p-2  rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] hover:bg-[#1fb8b9]"
                    onClick={() => setOpenFilter((prevState) => !prevState)}
                  >
                    <FilterIcon />
                  </button>
                </div>
              ) : (
                ""
              )}
              {tableData.extraButton ? <>{tableData.extraButton}</> : ""}
            </div>
            <div className={"flex justify-between items-center gap-1"}>
              <select
                className="w-full max-w-xs select-bordered select-sm select"
                onChange={(e) => {
                  setPage(1);
                  setSearch("");
                  setPerPage(parseInt(e.target.value));
                }}
                value={perPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={500}>500</option>
              </select>
              <label className="flex items-center relative gap-2 w-full">
                <input
                  type="text"
                  className="input-bordered input input-sm"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <SearchIcon
                  className={`w-4 h-4 opacity-70 absolute top-2 right-2`}
                />
              </label>
            </div>
          </div>
          <div className="border-gray-200 border rounded-lg">
            <div className="rounded-t-lg overflow-x-auto relative">
              {isPending && !isRefetching ? (
                <div className="top-1/2 left-1/2 z-10 absolute flex justify-center items-center bg-transparent/5 opacity-70 m-auto w-full h-full text-center transform -translate-x-1/2 -translate-y-1/2">
                  <LoadingSpin className="w-8 h-8" />
                </div>
              ) : null}
              <table className="relative bg-white scroll-my-0 divide-y-2 divide-gray-200 min-w-full text-sm overflow-y-hidden">
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
                  revalidate={refetch}
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
    </>
  );
};

export default DataTable;