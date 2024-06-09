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
      <p className="absolute hidden whitespace-nowrap  w-fit text-sm group-hover/comp:!block  ltr:left-[90%] rtl:right-[90%] bg-black/70 text-white rounded-2xl z-[1000] p-2">
        {title}
      </p>
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