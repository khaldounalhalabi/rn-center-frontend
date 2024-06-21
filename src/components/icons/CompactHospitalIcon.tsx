import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const CompactHospitalIcon: React.FC<IconAttributes> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M18 14h-4v4h-4v-4H6v-4h4V6h4v4h4m2-8H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 18H4V4h16z"
      ></path>
    </svg>
  );
};

export default CompactHospitalIcon;