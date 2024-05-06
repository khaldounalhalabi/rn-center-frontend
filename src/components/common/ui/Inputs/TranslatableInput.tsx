"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { Locales, Translatable } from "@/Models/Translatable";
import { translate } from "@/Helpers/Translations";
import SelectedLocale from "../Selects/SelectLocale";

interface TranslatableInputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: Locales[];
  required?: boolean;
}

const TranslatableInput: React.FC<TranslatableInputProps> = ({
  className,
  label,
  locales = ["en", "ar"],
  name,
  required = false,
  ...props
}) => {
  const {
    register,
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();

  const defaultValue = getNestedPropertyValue(defaultValues, `${name}`);
  const [selectedLocale, setSelectedLocale] = useState<Locales>("en");
  const [tValue, setTValue] = useState<Translatable>(
    typeof defaultValue == "string"
      ? translate(defaultValue, true)
      : defaultValue ?? { en: "", ar: "" },
  );

  const handleInputChange = (locale: Locales, v: string) => {
    tValue[locale] = v ?? defaultValue[`${locale}`];
    setTValue(tValue);
    setValue(name, JSON.stringify(tValue));
  };

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={`flex flex-col items-start justify-between w-full`}>
      {label ? (
        <label className={"label"}>
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </label>
      ) : (
        ""
      )}
      <div className="flex items-center w-full relative">
        <input
          type={"text"}
          className={"hidden"}
          hidden={true}
          {...register(`${name}`)}
        />
        <SelectedLocale
          locales={locales}
          className={"absolute z-auto ltr:right-1 rtl:left-1 "}
          setSelectedLocale={setSelectedLocale}
        />
        {locales.map((l: Locales, index) => (
          <input
            key={index}
            {...props}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom ${selectedLocale != l ? "hidden" : ""}`
            }
            onChange={(e) => handleInputChange(l, e.target.value)}
            defaultValue={tValue ? tValue[l] ?? "" : ""}
          />
        ))}
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TranslatableInput;
