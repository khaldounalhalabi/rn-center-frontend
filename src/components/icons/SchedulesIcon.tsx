import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const SchedulesIcon: React.FC<IconAttributes> = ({ className, ...props }) => {
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
        strokeWidth={2}
        d="M17 7h6v16H7v-4m16-8h-6M13 0v3M1 7h16M1 3h16v16H1zm4-3v3m-1 8h2m2 0h6M4 15h2m2 0h6"
      ></path>
    </svg>
  );
};

export default SchedulesIcon;
