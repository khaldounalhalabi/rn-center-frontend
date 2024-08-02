import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const ChangeStatusIcon: React.FC<IconAttributes> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0m12 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M6 12v-2a6 6 0 1 1 12 0v2"></path>
        <path d="m15 9l3 3l3-3"></path>
      </g>
    </svg>
  );
};

export default ChangeStatusIcon;