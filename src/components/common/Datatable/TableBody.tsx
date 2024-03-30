import { ApiResponse } from "@/Http/Response";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import React from "react";
import { DataTableData } from "@/components/common/Datatable/DataTable";

const TableBody = ({
  tableData,
  data,
  setHidden,
  hidden = [],
}: {
  tableData: DataTableData<any>;
  data: ApiResponse<any> | undefined;
  setHidden: (value: ((prevState: number[]) => number[]) | number[]) => void;
  hidden: number[];
}) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {data?.data?.map((item: any, index: any) => {
        if (!hidden.includes(item.id ?? index)) {
          return (
            <tr key={`${index}-${item.label}`}>
              {tableData.schema.map((schema, index) => {
                if (!schema.render && schema.name) {
                  return (
                    <td
                      key={`${schema.label} - ${index}`}
                      className={
                        schema.cellProps?.className ??
                        "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                      }
                      {...schema.cellProps}
                    >
                      {getNestedPropertyValue(item, schema.name) ?? "No Data"}
                    </td>
                  );
                } else if (schema.render && schema.name) {
                  return (
                    <td
                      key={`${schema.label} - ${index}`}
                      className={
                        schema.cellProps?.className ??
                        "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                      }
                      {...schema.cellProps}
                    >
                      {schema.render(
                        getNestedPropertyValue(item, schema.name) ?? "No Data",
                        item,
                        setHidden,
                      )}
                    </td>
                  );
                } else if (schema.render) {
                  return (
                    <td
                      key={`${schema.label} - ${index}`}
                      className={
                        schema.cellProps?.className ??
                        "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                      }
                      {...schema.cellProps}
                    >
                      {schema.render(undefined, item, setHidden)}
                    </td>
                  );
                } else
                  return (
                    <td
                      key={index}
                      className={
                        schema.cellProps?.className ??
                        "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                      }
                      {...schema.cellProps}
                    >
                      No Data
                    </td>
                  );
              })}
            </tr>
          );
        }
      })}
    </tbody>
  );
};

export default TableBody;
