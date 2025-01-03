import LoadingSpin from "@/components/icons/LoadingSpin";
import React, { ReactNode } from "react";

interface ButtonAttr extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  isSubmitting?: boolean;
}

const AuthSubmitButton: React.FC<ButtonAttr> = ({
  children,
  isSubmitting = false,
  disabled = false,
  className = "px-12 py-3",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`cursor-pointer flex justify-center relative bg-gradient-to-r from-[#5DE8E9] to-[#2CCACB] text-white text-lg font-medium rounded-full shadow-lg transition transform hover:brightness-105 ${className}`}
      disabled={disabled || isSubmitting}
    >
      {children}
      <LineC className={"absolute top-[7%] right-[8%] w-4 h-4 "} />

      {isSubmitting ? (
        <span className="mx-1">
          <LoadingSpin className="w-6 h-6 text-white" />
        </span>
      ) : (
        ""
      )}
    </button>
  );
};

export default AuthSubmitButton;

export const LineC = ({ className = "" }: { className: string }) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 1.81085C7.90967 3.85583 11.1383 6.04193 14.0358 13.3561"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
