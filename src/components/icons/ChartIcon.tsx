import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const ChartIcon: React.FC<IconAttributes> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3 4h1v14l5.58-9.67l6.01 3.47l3.62-6.26l.86.5l-4.11 7.13L9.95 9.7L4 20h16v1H3z"
      ></path>
    </svg>
  );
};

export default ChartIcon;