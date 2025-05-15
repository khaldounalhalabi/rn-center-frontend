import { ApiResponse } from "@/http/Response";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";

const TablePaginator = ({
  data,
  setPage,
}: {
  data: ApiResponse<any> | undefined;
  placeholderData: boolean;
  page: number;
  setPage: (value: ((prevState: number) => number) | number) => void;
}) => {
  const t = useTranslations("table");
  const locale = useLocale();

  return (
    <div className="flex justify-end px-4 mt-2">
      <Pagination className={`flex items-center justify-end gap-1`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (!data?.paginate?.is_first) {
                  setPage((old) => Math.max(old - 1, 0));
                }
              }}
              aria-disabled={data?.paginate?.is_first ?? true}
              title={t("prevPage")}
              className={"cursor-pointer aria-disabled:cursor-not-allowed"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (!data?.paginate?.is_last) {
                  setPage((old) => old + 1);
                }
              }}
              aria-disabled={data?.paginate?.is_last ?? true}
              title={t("nextPage")}
              className={"cursor-pointer aria-disabled:cursor-not-allowed"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePaginator;
