import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ className, label, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div
      className={`flex ${props.type == `radio` ? `` : "flex-col"} items-start gap-2 w-full`}
    >
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
