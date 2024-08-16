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
  ...props
}) => {
  return (
    <button
      {...props}
      className="flex relative px-10 py-3 bg-[#56d5d8] text-white text-lg font-medium rounded-full shadow-lg transition transform hover:brightness-105"
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
