import React, { HTMLProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import { Locales, Translatable } from "@/Models/Translatable";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useLocale } from "next-intl";

interface TranslatableTextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: Locales[];
  defaultValue?: string;
  required?: boolean;
  locale?: "en" | "ar" | undefined;
}

const TranslatableTextArea: React.FC<TranslatableTextAreaProps> = ({
  defaultValue,
  className,
  label,
  locales = ["en", "ar"],
  name,
  required = false,
  locale = undefined,
  placeholder = undefined,
  ...props
}) => {
  placeholder = undefined;
  const currentLocale = useLocale() as "en" | "ar";
  const [selectedLocale, setSelectedLocale] = useState<Locales>(
    locale ?? currentLocale ?? "en",
  );
  const [trVal, setTrVal] = useState<Translatable>(
    defaultValue ? TranslateClient(defaultValue, true) : { en: "", ar: "" },
  );
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setSelectedLocale(locale ?? currentLocale);
  }, [locale , currentLocale]);

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
        value={selectedLocale}
        onChange={(e) => setSelectedLocale(e.target.value as Locales)}
        className="select select-bordered"
        defaultValue={selectedLocale}
      >
        {locales.map((e: string, index: number) => (
          <option key={index} value={e} className="cursor-pointer">
            {e}
          </option>
        ))}
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
              <label className={"label justify-start"}>
                {label + " : " + locale.toUpperCase()}
                {required ? (
                  <span className="ml-1 text-red-600">*</span>
                ) : (
                  false
                )}
              </label>
            ) : (
              ""
            )}
            <textarea
              {...props}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder=""
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
