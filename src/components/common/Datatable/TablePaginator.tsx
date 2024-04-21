import { ApiResponse } from "@/Http/Response";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import React from "react";

const TablePaginator = ({
  data,
  placeholderData,
  page,
  setPage,
}: {
  data: ApiResponse<any> | undefined;
  placeholderData: boolean;
  page: number;
  setPage: (value: ((prevState: number) => number) | number) => void;
}) => {
  const paginationArray = [...Array(data?.paginate?.total_pages ?? 0)];
  return (
    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 flex justify-between">
      <div className={"justify-start"}>
        Total Pages : {data?.paginate?.total}
      </div>
      <ol className="flex justify-end items-center gap-1 text-xs font-medium">
        <li>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
          >
            <span className="sr-only">Prev Page</span>
            <ChevronLeft />
          </button>
        </li>

        {paginationArray.map((_e, index) => {
          if (index < 3 || index >= paginationArray.length - 1) {
            return (
              <li key={`page-${index + 1}`}>
                <button
                  onClick={() => setPage(index + 1)}
                  className={`block size-8 rounded border border-gray-100 text-center leading-8 text-gray-900 ${index + 1 == data?.paginate?.currentPage ? "bg-info" : "bg-white"}`}
                >
                  {index + 1}
                </button>
              </li>
            );
          } else
            return (
              <li key={`page-${index + 1}`}>
                <span>.</span>
              </li>
            );
        })}
        <li>
          <button
            onClick={() => {
              if (!placeholderData && !data?.paginate?.isLast) {
                setPage((old) => old + 1);
              }
            }}
            disabled={placeholderData && data?.paginate?.isLast}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
          >
            <span className="sr-only">Next Page</span>
            <ChevronRight />
          </button>
        </li>
      </ol>
    </div>
  );
};

export default TablePaginator;
