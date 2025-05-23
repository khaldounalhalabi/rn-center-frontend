import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import React from "react";
import { DataTableSchema } from "@/components/common/Datatable/DataTable";
import { TableHead, TableRow } from "@/components/ui/shadcn/table";

const DataTableHead = ({
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
    <TableRow className="ltr:text-left rtl:text-right">
      {schema.map((header) => (
        <TableHead
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
          className={"cursor-pointer border"}
        >
          <div className={"flex gap-1 items-center"}>
            {header.label}

            {header.sortable && (
              <div className={`flex flex-col gap-0`}>
                <ChevronUp
                  className={`h-3 w-3 ${sortDir == "asc" && sortCol == header.name ? "fill-primary" : ""}`}
                />
                <ChevronDown
                  className={`h-3 w-3 ${sortDir == "desc" && sortCol == header.name ? "fill-primary" : ""}`}
                />
              </div>
            )}
          </div>
        </TableHead>
      ))}
    </TableRow>
  );
};

export default DataTableHead;
