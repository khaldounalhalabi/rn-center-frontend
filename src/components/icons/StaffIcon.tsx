import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const StaffIcon: React.FC<IconAttributes> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 48 48">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M10 44h28a2 2 0 0 0 2-2V14H30V4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2M30 4l10 10"></path>
        <circle cx={24} cy={24} r={4}></circle>
        <path d="M32 36a8 8 0 1 0-16 0"></path>
      </g>
    </svg>
  );
};

export default StaffIcon;
