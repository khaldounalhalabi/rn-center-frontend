import { ApiResponse } from "@/http/Response";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import React from "react";
import { DataTableData } from "@/components/common/Datatable/DataTable";
import {
  TranslateClient,
  TranslateStatusOrTypeClient,
} from "@/helpers/TranslationsClient";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { TableBody, TableCell, TableRow } from "@/components/ui/shadcn/table";

const DataTableBody = ({
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
    <TableBody className="table-bordered border">
      {data?.data?.length ? (
        data?.data?.map((item: any, index: any) => {
          if (!hidden.includes(item.id ?? index)) {
            return (
              <TableRow key={`${index}-${item.label}`}>
                {tableData.schema.map((schema, index) => {
                  if (!schema.render && schema.name) {
                    return (
                      <TableCell
                        className="text-start max-w-sm border"
                        key={`${schema.label} - ${index}`}
                      >
                        {schema?.translatable
                          ? TranslateClient(
                              getNestedPropertyValue(item, schema.name),
                            )
                          : getNestedPropertyValue(item, schema.name) ?? (
                              <TranslatableEnum value={"no_data"} />
                            )}
                      </TableCell>
                    );
                  } else if (schema.render && schema.name) {
                    return (
                      <TableCell
                        className="text-start border"
                        key={`${schema.label} - ${index}`}
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
                          revalidate,
                        )}
                      </TableCell>
                    );
                  } else if (schema.render) {
                    return (
                      <TableCell
                        className="text-start border"
                        key={`${schema.label} - ${index}`}
                      >
                        {schema.render(undefined, item, setHidden, revalidate)}
                      </TableCell>
                    );
                  } else
                    return (
                      <TableCell className="text-center border" key={index}>
                        <TranslatableEnum value={"no_data"} />
                      </TableCell>
                    );
                })}
              </TableRow>
            );
          }
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={tableData.schema.length}
            className={"p-3 text-center"}
          >
            {TranslateStatusOrTypeClient("no_data")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default DataTableBody;
