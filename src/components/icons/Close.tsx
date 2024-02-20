import React from "react";
import { IconAttributes } from "@/types/IconAttributes";

const Close: React.FC<IconAttributes> = ({ className, ...props }) => {
    return (
       <svg
        className={className}
        {...props}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
       </svg>
);
};

export default Close;
