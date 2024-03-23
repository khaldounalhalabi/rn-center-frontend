"use client";
import React, { HTMLProps, useState } from "react";
import { InputProps } from "@/components/common/ui/Input";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

interface TranslatableInputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  label?: string;
  locales: {
    en?: UseFormRegisterReturn;
    ar?: UseFormRegisterReturn;
  };
  error?: string;
}

const TranslatableInput: React.FC<TranslatableInputProps> = ({
  className,
  label,
  locales,
  error,
  ...props
}) => {
  const [selectedLocale, setSelectedLocale] = useState("en");
  const formContext = useFormContext();
  return (
    <div className={`flex flex-col items-start justify-between gap-2 w-full`}>
      {label ? <label>{label}</label> : ""}
      <div className="flex items-center w-full">
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="select select-bordered"
          onInput={(e) => {
            setSelectedLocale(e.target.value);
          }}
        >
          {locales.en ? <option value={"en"}>EN</option> : ""}
          {locales.ar ? <option value={"ar"}>AR</option> : ""}
        </select>

        {locales.en ? (
          <input
            {...props}
            {...locales.en}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom ${selectedLocale != "en" ? "hidden" : ""}`
            }
          />
        ) : (
          ""
        )}

        {locales.ar ? (
          <input
            {...props}
            {...locales.ar}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom ${selectedLocale != "ar" ? "hidden" : ""}`
            }
          />
        ) : (
          ""
        )}
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TranslatableInput;
