import React, { HTMLAttributes, HTMLProps, InputHTMLAttributes } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  register: UseFormRegisterReturn;
  className?: string | undefined;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  register,
  className,
  label,
  error,
  ...props
}) => {
  const formContext = useFormContext();
  return (
    <div className={`flex flex-col items-start gap-2 w-full`}>
      {label ? <label>{label}</label> : ""}
      <input
        {...props}
        {...register}
        className={
          className ??
          `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom`
        }
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default Input;
