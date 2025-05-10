import React, { ReactNode } from "react";

const SidebarCompactIcon = ({
  title,
  icon,
  className = undefined,

  children,
}: {
  title: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <li className={`group/comp ${className}`}>
      <details className="[&_summary::-webkit-details-marker]:hidden">
        <summary className="my-1 flex h-12 w-full cursor-pointer items-center justify-center px-2">
          <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
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
