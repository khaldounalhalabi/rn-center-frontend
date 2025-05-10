import React, { ReactNode } from "react";

interface ButtonAttr extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

const PrimaryButton: React.FC<ButtonAttr> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn bg-pom text-white hover:border-pom hover:bg-white hover:text-pom ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default PrimaryButton;
