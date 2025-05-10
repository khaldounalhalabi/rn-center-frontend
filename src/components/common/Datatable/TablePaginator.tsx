import { ApiResponse } from "@/http/Response";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

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
    <div className="flex justify-end rounded-b-lg border-t border-gray-200 px-4 py-2">
      <ol className={`flex items-center justify-end gap-1 text-xs font-medium`}>
        <li>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={data?.paginate?.is_first ?? true}
            className="btn btn-square btn-sm cursor-pointer bg-pom disabled:btn-neutral disabled:text-black"
          >
            <div className="tooltip" data-tip={t("prevPage")}>
              {locale == "ar" ? <ChevronRight /> : <ChevronLeft />}
            </div>
          </button>
        </li>
        <li>
          <button
            type={"button"}
            onClick={() => {
              if (!data?.paginate?.is_last) {
                setPage((old) => old + 1);
              }
            }}
            disabled={data?.paginate?.is_last ?? true}
            className="btn btn-square btn-sm cursor-pointer bg-pom disabled:btn-neutral disabled:text-black"
          >
            <div className="tooltip" data-tip={t("nextPage")}>
              {locale == "ar" ? <ChevronLeft /> : <ChevronRight />}
            </div>
          </button>
        </li>
      </ol>
    </div>
  );
};

export default TablePaginator;
