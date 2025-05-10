import { ApiResponse } from "@/http/Response";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import React from "react";
import { DataTableData } from "@/components/common/Datatable/DataTable";
import {
  TranslateClient,
  TranslateStatusOrTypeClient,
} from "@/helpers/TranslationsClient";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";

const TableBody = ({
  tableData,
  data,
  setHidden,
  revalidate,
  hidden = [],
}: {
  tableData: DataTableData<any>;
  data: ApiResponse<any> | undefined;
  setHidden: (value: ((prevState: number[]) => number[]) | number[]) => void;
  revalidate?: () => void;
  hidden: number[];
}) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {data?.data?.length ? (
        data?.data?.map((item: any, index: any) => {
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
                          "whitespace-nowrap border px-4 py-2 font-medium text-gray-900"
                        }
                        {...schema.cellProps}
                      >
                        {schema?.translatable
                          ? TranslateClient(
                              getNestedPropertyValue(item, schema.name),
                            )
                          : getNestedPropertyValue(item, schema.name) ?? (
                              <TranslatableEnum value={"no_data"} />
                            )}
                      </td>
                    );
                  } else if (schema.render && schema.name) {
                    return (
                      <td
                        key={`${schema.label} - ${index}`}
                        className={
                          schema.cellProps?.className ??
                          "whitespace-nowrap border px-4 py-2 font-medium text-gray-900"
                        }
                        {...schema.cellProps}
                      >
                        {schema.render(
                          schema?.translatable
                            ? TranslateClient(
                                getNestedPropertyValue(item, schema.name),
                              )
                            : getNestedPropertyValue(item, schema.name) ?? (
                                <TranslatableEnum value={"no_data"} />
                              ),
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
                          "whitespace-nowrap border px-4 py-2 font-medium text-gray-900"
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
                          "whitespace-nowrap border px-4 py-2 font-medium text-gray-900"
                        }
                        {...schema.cellProps}
                      >
                        <TranslatableEnum value={"no_data"} />
                      </td>
                    );
                })}
              </tr>
            );
          }
        })
      ) : (
        <tr>
          <td colSpan={tableData.schema.length} className={"p-3 text-center"}>
            {TranslateStatusOrTypeClient("no_data")}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
