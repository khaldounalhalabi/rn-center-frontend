"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue, translate } from "@/Helpers/ObjectHelpers";
import { Locales, Translatable } from "@/Models/Translatable";

interface TranslatableTextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: Locales[];
  defaultValue?: string;
}

const TranslatableTextArea: React.FC<TranslatableTextAreaProps> = ({
  defaultValue,
  className,
  label,
  locales = ["en", "ar"],
  name,
  ...props
}) => {
  const [selectedLocale, setSelectedLocale] = useState<Locales>("en");
  const [trVal, setTrVal] = useState<Translatable>(
    defaultValue ? translate(defaultValue, true) : { en: "", ar: "" },
  );
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.target.value;
    setTrVal((prevTrVal: Translatable) => {
      prevTrVal[selectedLocale] = val;
      return prevTrVal;
    });
    setValue(name, JSON.stringify(trVal));
  };

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className="flex items-center">
      <select
        onChange={(e) => setSelectedLocale(e.target.value as Locales)}
        className="select select-bordered"
      >
        {locales.map((e: string, index: number) => {
          return (
            <option key={index} value={e} className="cursor-pointer">
              {e}
            </option>
          );
        })}
      </select>

      {locales.map((locale: Locales, index: number) => {
        return (
          <div
            className={
              locale == selectedLocale
                ? "!block w-full ltr:pl-3 rtl:pr-3"
                : "!hidden"
            }
            key={index}
          >
            {label ? (
              <label className={"label"}>
                {label + " : " + locale.toUpperCase()}
              </label>
            ) : (
              ""
            )}
            <textarea
              {...props}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Write your thoughts here..."
              dir={selectedLocale == "ar" ? "rtl" : "ltr"}
              defaultValue={trVal[locale] ?? ""}
              name={`${name}.${locale}`}
              onChange={(e) => handleChange(e)}
            />
            {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
          </div>
        );
      })}
    </div>
  );
};

export default TranslatableTextArea;
