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
  className = "px-10 py-3",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`cursor-pointer flex justify-center relative bg-[#56d5d8] text-white text-lg font-medium rounded-full shadow-lg transition transform hover:brightness-105 ${className}`}
      disabled={disabled || isSubmitting}
    >
      {children}
      <span className="absolute top-0 right-0 w-4 h-4 bg-white bg-opacity-25 rounded-full"></span>

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
