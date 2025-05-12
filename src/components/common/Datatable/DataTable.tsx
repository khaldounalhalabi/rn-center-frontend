"use client";
import React, { ReactNode, ThHTMLAttributes, useState } from "react";
import { ApiResponse } from "@/http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useQuery } from "@tanstack/react-query";
import DataTableHead from "@/components/common/Datatable/DataTableHead";
import DataTableBody from "@/components/common/Datatable/DataTableBody";
import TablePaginator from "@/components/common/Datatable/TablePaginator";
import { useTranslations } from "next-intl";
import { Table, TableBody, TableHeader } from "@/components/ui/shadcn/table";
import { Link } from "@/navigation";
import DocumentPlus from "@/components/icons/DocumentPlus";
import FilterIcon from "@/components/icons/FilterIcon";
import ShadcnDialog from "@/components/common/ui/ShadcnDialog";
import { Button } from "@/components/ui/shadcn/button";
import Select from "../ui/selects/Select";
import { Input } from "@/components/ui/shadcn/input";

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
  const [sortDir, setSortDir] = useState("asc");
  const [sortCol, setSortCol] = useState("");
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
      <div className={"h-full w-full p-1"}>
        {tableData?.title && <h1>{tableData.title ?? ""}</h1>}
        <div
          className={`card-actions my-4 flex w-full items-center justify-between`}
        >
          <div className={"flex gap-1"}>
            {tableData.createUrl ? (
              <Link href={tableData.createUrl ?? "#"}>
                <Button variant={"default"} size={"icon"}>
                  <DocumentPlus className={`h-6 w-6`} />
                </Button>
              </Link>
            ) : (
              ""
            )}
            {tableData?.filter && (
              <div>
                <ShadcnDialog
                  trigger={
                    <Button variant={"outline"} size={"icon"}>
                      <FilterIcon />
                    </Button>
                  }
                  title={t("filters")}
                  footer={
                    <>
                      <Button
                        onClick={() => {
                          setParams(tempParams);
                          setPage(1);
                        }}
                      >
                        {t("apply")}
                      </Button>

                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          setTempParams({});
                          setParams({});
                          setPage(1);
                        }}
                      >
                        {t("resetFilters")}
                      </Button>
                    </>
                  }
                >
                  {tableData.filter(tempParams, setTempParams)}
                </ShadcnDialog>
              </div>
            )}
            {tableData.extraButton ? <>{tableData.extraButton}</> : ""}
          </div>
          <div className={"flex items-center justify-between gap-1"}>
            <Select
              data={["10", "25", "50", "75", "500"]}
              selected={`${perPage}`}
              onChange={(value) => {
                setPage(1);
                setSearch("");
                setPerPage(parseInt(value));
              }}
            />
            <Input
              type="search"
              placeholder={t("search")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              dir={"ltr"}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <DataTableHead
              schema={tableData.schema}
              setSortDir={setSortDir}
              setSortCol={setSortCol}
              sortDir={sortDir}
              sortCol={sortCol}
            />
          </TableHeader>

          <DataTableBody
            data={data}
            tableData={tableData}
            hidden={hideCols}
            setHidden={setHideCols}
            revalidate={refetch}
          />
          {isPending && !isRefetching && (
            <TableBody className="absolute left-1/2 top-1/2 z-10 m-auto flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-transparent/5 text-center opacity-70">
              <LoadingSpin className="h-8 w-8" />
            </TableBody>
          )}
        </Table>
        <TablePaginator
          key={"next-page"}
          data={data}
          setPage={setPage}
          page={page}
          placeholderData={isPlaceholderData}
        />
      </div>
    </>
  );
};

export default DataTable;
