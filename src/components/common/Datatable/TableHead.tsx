import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import React from "react";
import { DataTableSchema } from "@/components/common/Datatable/DataTable";

const TableHead = ({
  schema,
  sortDir,
  setSortDir,
  sortCol,
  setSortCol,
}: {
  schema: DataTableSchema<any>[];
  sortDir: string;
  setSortDir: (value: ((prevState: string) => string) | string) => void;
  sortCol: string;
  setSortCol: (value: ((prevState: string) => string) | string) => void;
}) => {
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        {schema.map((header) => (
          <th
            key={header.label}
            onClick={() => {
              if (header.name && header.sortable) {
                setSortDir((prevState) => {
                  if (prevState == "asc") {
                    return "desc";
                  } else return "asc";
                });

                setSortCol(header.name);
              }
            }}
            className={
              header.headerProps?.className ??
              `whitespace-nowrap px-4 py-2 font-medium text-gray-900 ${header.sortable ? "cursor-pointer" : ""}`
            }
            {...header.headerProps}
          >
            <div className={`flex items-center justify-between gap-2`}>
              {header.label}

              {header.sortable ? (
                <div className={`flex flex-col gap-0`}>
                  <ChevronUp
                    className={`h-3 w-3 ${sortDir == "asc" && sortCol == header.name ? "fill-info" : ""}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortDir == "desc" && sortCol == header.name ? "fill-info" : ""}`}
                  />
                </div>
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
