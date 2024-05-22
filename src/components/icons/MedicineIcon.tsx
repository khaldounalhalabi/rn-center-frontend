import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const MedicineIcon: React.FC<IconAttributes> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M8.6 16.4a4.6 4.6 0 0 1-6.5-6.5l7.8-7.8a4.6 4.6 0 0 1 6.5 6.5M5.999 5.999l4.25 4.25"></path>
        <path d="M23.25 15.75a7.669 7.669 0 0 1-6 7.5a7.669 7.669 0 0 1-6-7.5V13.5a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5zm-6-.75v4.5M15 17.25h4.5"></path>
      </g>
    </svg>
  );
};

export default MedicineIcon;
