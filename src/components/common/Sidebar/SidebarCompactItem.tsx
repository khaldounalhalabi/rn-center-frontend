import React, { ReactNode } from "react";
import ChevronDown from "@/components/icons/ChevronDown";

const SidebarCompactItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg  px-4 py-4  text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium"> {title} </span>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <ChevronDown className="h-5 w-5" />
          </span>
        </summary>
        <ul className="mt-2 space-y-1 px-4">{children}</ul>
      </details>
    </li>
  );
};

export default SidebarCompactItem;
