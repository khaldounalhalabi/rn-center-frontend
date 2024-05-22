import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const CategoryIcon: React.FC<IconAttributes> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6"
      ></path>
    </svg>
  );
};

export default CategoryIcon;
