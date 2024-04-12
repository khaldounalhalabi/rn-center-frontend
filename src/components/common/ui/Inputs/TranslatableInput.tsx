"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue, translate } from "@/Helpers/ObjectHelpers";
import { Locales, Translatable } from "@/Models/Translatable";

interface TranslatableInputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: Locales[];
}

const TranslatableInput: React.FC<TranslatableInputProps> = ({
  className,
  label,
  locales = ["en", "ar"],
  name,
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
    translate(defaultValue, true),
  );

  setValue(name, JSON.stringify(tValue));

  const handleInputChange = (locale: Locales, v: string) => {
    tValue[locale] = v ?? defaultValue[`${locale}`];
    setTValue(tValue);
    setValue(name, JSON.stringify(tValue));
  };

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={`flex flex-col items-start justify-between w-full`}>
      {label ? <label className={"label"}>{label}</label> : ""}
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
          onChange={(e) => setSelectedLocale(e.target.value as Locales)}
        >
          {locales.map((l) => (
            <option value={l} key={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>
        {locales.map((l: Locales, index) => (
          <input
            key={index}
            {...props}
            className={
              className ??
              `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom ${selectedLocale != l ? "hidden" : ""}`
            }
            onChange={(e) => handleInputChange(l, e.target.value)}
            defaultValue={defaultValue ? defaultValue[l] ?? "" : ""}
          />
        ))}
      </div>
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TranslatableInput;
