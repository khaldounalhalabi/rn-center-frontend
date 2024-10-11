"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import ClosedEye from "@/components/icons/ClosedEye";
import Eye from "@/components/icons/Eye";
import { useLocale } from "next-intl";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name?: string;
  label?: string;
  type: string;
  required?: boolean;
  setWatch?: React.Dispatch<number>;
  unit?:
    | "IQD"
    | "day"
    | "week"
    | "month"
    | "hour"
    | "sec"
    | "min"
    | "%"
    | undefined;
  min?: number;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  type,
  required = false,
  setWatch,
  unit,
  min = 0,
  placeholder = undefined,
  ...props
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  if (setWatch) {
    setWatch(watch(name ?? ""));
  }
  const locale = useLocale();
  const [hidden, setHidden] = useState(true);
  placeholder = undefined;

  const error = getNestedPropertyValue(errors, `${name}.message`);
  if (type == "password") {
    return (
      <div className={`flex flex-col items-start w-full`}>
        {label ? (
          <label className={"label w-fit"}>
            {label}
            {unit ? (
              <span className="ml-1 ">
                (<span className="text-green-500">{unit}</span>)
              </span>
            ) : (
              ""
            )}
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
              className={`absolute w-6 h-6 right-1 top-3 cursor-pointer ${locale == "ar" ? "right-[90%]" : ""}`}
              onClick={() => setHidden((prevState) => !prevState)}
            />
          ) : (
            <Eye
              className={`absolute w-6 h-6 right-1 top-3 cursor-pointer ${locale == "ar" ? "right-[90%]" : ""}`}
              onClick={() => setHidden((prevState) => !prevState)}
            />
          )}
        </div>

        <p className={`text-error text-sm min-h-5`}>{error}</p>
      </div>
    );
  } else
    return (
      <div
        className={`flex ${type == `radio` ? `items-center` : "flex-col"} items-start w-full`}
      >
        {label ? (
          <label className={"label text-nowrap"}>
            {label}
            {unit ? (
              <span className="ml-1 ">
                (<span className="text-green-500">{unit}</span>)
              </span>
            ) : (
              ""
            )}
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
          min={min}
          type={type == "password" && hidden ? "password" : type}
          step={"any"}
        />
        <p className={`text-error text-sm min-h-5`}>{error}</p>
      </div>
    );
};

export default Input;
