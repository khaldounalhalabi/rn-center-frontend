import React, { ReactNode } from "react";

const SidebarCompactIcon = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <li className={"group/comp"}>
      <details className=" [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-center w-full h-12 px-2 my-1 ">
          <span className="text-sm font-medium flex cursor-pointer items-center justify-center  text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-2xl w-full h-full">
            {" "}
            {icon}{" "}
          </span>
        </summary>
        <ul className="mt-2 space-y-1">{children}</ul>
      </details>
    </li>
  );
};

export default SidebarCompactIcon;
