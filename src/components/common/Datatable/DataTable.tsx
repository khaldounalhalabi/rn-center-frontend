"use client";
import React, { Fragment, ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse } from "@/http/Response";
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
import { Label } from "@/components/common/ui/labels-and-values/Label";

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
    revalidate?: () => void,
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
    params?: object,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  filter?: (
    params: Record<string, any>,
    setParams: (
      value:
        | ((prevState: Record<string, any>) => Record<string, any>)
        | Record<string, any>,
    ) => void,
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
      retry: true,
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
                      className="text-start text-lg font-medium leading-6 text-gray-900"
                    >
                      <Label label={t("filters")} />
                    </Dialog.Title>
                    <div className="mt-2">
                      {tableData.filter(tempParams, setTempParams)}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setParams(tempParams);
                          setOpenFilter(false);
                          setPage(1);
                        }}
                      >
                        {t("apply")}
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-error px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setTempParams({});
                          setParams({});
                          setOpenFilter(false);
                          setPage(1);
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
      <div className={`card m-3 bg-base-100 shadow-xl`}>
        <div className={`card-body`}>
          {tableData.title ? (
            <h1 className={"card-title"}>{tableData.title}</h1>
          ) : (
            ""
          )}
          <div
            className={`card-actions flex w-full items-center justify-between`}
          >
            <div className={"flex gap-1"}>
              {tableData.createUrl ? (
                <Link href={tableData.createUrl ?? "#"}>
                  <button className="rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] p-2 hover:bg-[#1fb8b9]">
                    <DocumentPlus className={`h-6 w-6`} />
                  </button>
                </Link>
              ) : (
                ""
              )}
              {tableData?.filter ? (
                <div>
                  <button
                    className="rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] p-2 hover:bg-[#1fb8b9]"
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
            <div className={"flex items-center justify-between gap-1"}>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
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
              <label className="relative flex w-full items-center gap-2">
                <input
                  type="text"
                  className="input input-sm input-bordered w-full"
                  placeholder={t("search")}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  dir={"ltr"}
                />
                <SearchIcon
                  className={`absolute right-2 top-2 h-4 w-4 opacity-70`}
                />
              </label>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200">
            <div className="relative overflow-x-auto rounded-t-lg">
              {isPending && !isRefetching ? (
                <div className="absolute left-1/2 top-1/2 z-10 m-auto flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-transparent/5 text-center opacity-70">
                  <LoadingSpin className="h-8 w-8" />
                </div>
              ) : null}
              <table className="relative min-w-full scroll-my-0 divide-y-2 divide-gray-200 overflow-y-hidden bg-white text-sm">
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
