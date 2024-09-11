import React, { ReactNode } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import { usePathname } from "@/navigation";

const SidebarCompactItem = ({
  links,
  title,
    className=undefined,
  children,
}: {
  links: string[];
  title: string;
  className?:string
  children: ReactNode;
}) => {
  const path = usePathname();
  let active: string;
  if (links.includes(path)) {
    active = "text-white bg-[#1fb8b9]  border-l-4 border-[#013567]";
  } else {
    active = "text-gray-500 hover:bg-[#1fb8b9] hover:text-white";
  }

  return (
    <li className={`${className}`}>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className={`flex cursor-pointer items-center justify-between rounded-lg  px-4 py-4  ${active}`}
        >
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