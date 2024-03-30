"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface TranslatableInputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: string[];
}

const TranslatableInput: React.FC<TranslatableInputProps> = ({
  className,
  label,
  locales = ["en", "ar"],
  name,
  ...props
}) => {
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [tValue, setTValue] = useState<object>({});
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const handleInputChange = (locale: string, v: string) => {
    // @ts-ignore
    tValue[`${locale}`] = v;
    setTValue(tValue);
    setValue(name, JSON.stringify(tValue));
  };

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={`flex flex-col items-start justify-between gap-2 w-full`}>
      {label ? <label>{label}</label> : ""}
      <div className="flex items-center w-full">
        <input
          type={"text"}
          className={"hidden"}
          hidden={true}
          {...register(`${name}`)}
        />
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="select select-bordered"
          onInput={(e) => {
            // @ts-ignore
            setSelectedLocale(e.target.value);
          }}
        >
          {locales.map((l) => (
            <option value={l} key={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>
        {locales.map((l) => (
          <input
            key={l}
            {...props}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom ${selectedLocale != l ? "hidden" : ""}`
            }
            onChange={(e) => handleInputChange(l, e.target.value)}
          />
        ))}
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TranslatableInput;
