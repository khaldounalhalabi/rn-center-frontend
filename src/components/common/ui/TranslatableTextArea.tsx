"use client";
import React, { HTMLProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue, translate } from "@/Helpers/ObjectHelpers";
import { Translatable } from "@/Models/Translatable";

interface TranslatableTextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: string[];
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
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [trVal, setTrVal] = useState<Translatable>(
    defaultValue ? translate(defaultValue, true) : { en: "", ar: "" },
  );

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.target.value;
    setTrVal((prevTrVal) => {
      prevTrVal[selectedLocale] = val;
      return prevTrVal;
    });
    setValue(name, JSON.stringify(trVal));
  };

  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className="flex items-center">
      <select
        onChange={(e) => setSelectedLocale(e.target.value)}
        className="ltr:select select-bordered rtl:w-[75px] rtl:h-[48px] rtl:text-center cursor-pointer focus:border-blue-500 focus:border-2 rounded-xl"
      >
        {locales.map((e: string, index: number) => {
          return (
            <option key={index} value={e} className="cursor-pointer">
              {e}
            </option>
          );
        })}
      </select>

      {locales.map((locale: string, index: number) => {
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
              {...register(`${name}`)}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
              dir={selectedLocale == "ar" ? "rtl" : "ltr"}
              defaultValue={defaultValue ? defaultValue[locale] : ""}
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
