import React, { isValidElement, ReactNode } from "react";

export interface BodyData {
  data: any[] ;
}

const TBody = ({
  bodyData,
  props,
}: {
  bodyData: any[];
  props?: React.TdHTMLAttributes<HTMLTableDataCellElement> | undefined | null;
}) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {bodyData.map((data, index) => (
        <tr key={index}>
          {Object.keys(data).map((key, value) => {
            return (
              <td
                key={value}
                className={
                  props?.className ??
                  "whitespace-nowrap px-4 py-2 font-medium text-gray-900 border"
                }
                {...props}
              >
                {data[key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
