import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  name,
  ...props
}) => {
  const { register } = useFormContext();
  return (
    <div className={`flex flex-col items-start gap-2 w-full`}>
      {label ? <label>{label}</label> : ""}
      <input
        {...props}
        {...register(`${name}`)}
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
