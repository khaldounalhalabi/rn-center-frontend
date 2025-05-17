import { ApiResponse } from "@/http/Response";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/shadcn/pagination";
import { Button } from "@/components/ui/shadcn/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            <Button
              variant={"secondary"}
              onClick={() => {
                if (!data?.paginate?.is_first) {
                  setPage((old) => Math.max(old - 1, 0));
                }
              }}
              disabled={data?.paginate?.is_first ?? true}
              className={"flex justify-start cursor-pointer disabled:cursor-not-allowed"}
            >
              {locale == "ar" ? <ChevronRight /> : <ChevronLeft />}
              {t("prevPage")}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant={"secondary"}
              onClick={() => {
                if (!data?.paginate?.is_last) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={data?.paginate?.is_last ?? true}
              className={"flex justify-start cursor-pointer disabled:cursor-not-allowed"}
            >
              {t("nextPage")}
              {locale == "ar" ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePaginator;
