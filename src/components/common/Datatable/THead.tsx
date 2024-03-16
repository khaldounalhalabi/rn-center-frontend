import React, { ThHTMLAttributes } from "react";

export interface HeaderData {
  name: string;
}

const THead = ({
  headerData,
  props,
}: {
  headerData: HeaderData[];
  props?: ThHTMLAttributes<HTMLTableHeaderCellElement> | undefined | null;
}) => {
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        {headerData.map((header: HeaderData) => (
          <th
            key={header.name}
            className={
              props?.className ??
              "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
            }
            {...props}
          >
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
