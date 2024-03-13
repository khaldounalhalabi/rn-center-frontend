"use client";
import React, { ReactNode, ThHTMLAttributes } from "react";

export interface DataTableSchema {
  name: string;
  label: string;
  props?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
  render?: (
    data: any,
    fullObject?: any,
  ) => ReactNode | React.JSX.Element | undefined | null;
}

export interface DataTableData {
  schema: DataTableSchema[];
  bodyData: any[];
}

const DataTable = (tableData: DataTableData) => {
  return (
    <div className={`card mx-2`}>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                {tableData.schema.map((header) => (
                  <th
                    key={header.name}
                    className={
                      header.props?.className ??
                      "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                    }
                    {...header.props}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {tableData.bodyData.map((data, index) => (
                <tr key={index}>
                  {tableData.schema.map((schema, index) => {
                    if (!schema.render) {
                      return (
                        <td
                          key={index}
                          className={
                            "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                          }
                        >
                          {data[schema.name]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={index}>
                          {schema.render(data[schema.name], data)}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                1
              </a>
            </li>

            <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
