"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import ClosedEye from "@/components/icons/ClosedEye";
import Eye from "@/components/icons/Eye";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name?: string;
  label?: string;
  type: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  type,
  required = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [hidden, setHidden] = useState(true);

  const error = getNestedPropertyValue(errors, `${name}.message`);
  if (type == "password") {
    return (
      <div className={`flex flex-col items-start w-full`}>
        {label ? (
          <label className={"label"}>
            {label}
            {required ? <span className="ml-1 text-red-600">*</span> : false}
          </label>
        ) : (
          ""
        )}
        <div className={"relative w-full"}>
          <input
            {...props}
            {...register(`${name}`)}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom`
            }
            type={!hidden ? "text" : "password"}
          />
          {!hidden ? (
            <ClosedEye
              className={"absolute w-6 h-6 right-1 top-3 cursor-pointer"}
              onClick={() => setHidden((prevState) => !prevState)}
            />
          ) : (
            <Eye
              className={"absolute w-6 h-6 right-1 top-3 cursor-pointer"}
              onClick={() => setHidden((prevState) => !prevState)}
            />
          )}
        </div>

        {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
      </div>
    );
  } else
    return (
      <div
        className={`flex ${type == `radio` ? `` : "flex-col"} items-start w-full`}
      >
        {label ? (
          <label className={"label"}>
            {label}
            {required ? <span className="ml-1 text-red-600">*</span> : false}
          </label>
        ) : (
          ""
        )}
        <input
          {...props}
          {...register(`${name}`)}
          className={
            className ??
            `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom`
          }
          min={0}
          type={type == "password" && hidden ? "password" : type}
        />
        {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
      </div>
    );
};

export default Input;
