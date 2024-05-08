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
    <div className="flex justify-between border-gray-200 px-4 py-2 border-t rounded-b-lg">
      <div className={"justify-start"}>
        Total Records : {data?.paginate?.total}
      </div>
      <ol className="flex justify-end items-center gap-1 font-medium text-xs">
        <li>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={data?.paginate?.isFirst}
            className="inline-flex justify-center items-center border-gray-100 bg-white border rounded text-gray-900 cursor-pointer size-8 rtl:rotate-180"
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
          } else if (
            (index === 3 && page > 5) ||
            (index === paginationArray.length - 2 &&
              page < paginationArray.length - 4)
          ) {
            return (
              <li key={`page-${index + 1}`}>
                <span>...</span>
              </li>
            );
          } else if (index >= page - 2 && index <= page + 1) {
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
          } else return null;
        })}
        <li>
          <button
            onClick={() => {
              if (!placeholderData && !data?.paginate?.isLast) {
                setPage((old) => old + 1);
              }
            }}
            disabled={data?.paginate?.isLast}
            className="inline-flex justify-center items-center border-gray-100 bg-white border rounded text-gray-900 cursor-pointer size-8 rtl:rotate-180"
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
