import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const CheckMarkIcon: React.FC<IconAttributes> = ({
  className,
  ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} {...props} viewBox="0 0 12 12">
      <path
        fill="currentColor"
        d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0"
      ></path>
    </svg>
  );
};

export default CheckMarkIcon;