import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const AppointmentDeductionstIcon: React.FC<IconAttributes> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 48 48">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"></path>
        <path d="m21 31l5 4l8-10M14 15h20m-20 8h8"></path>
      </g>
    </svg>
  );
};

export default AppointmentDeductionstIcon;