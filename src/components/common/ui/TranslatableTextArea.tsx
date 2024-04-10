"use client";
import React, { HTMLProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";
import TextArea from "@/components/common/ui/TextArea";

interface TranslatableTextAreaProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  name: string;
  label?: string;
  locales?: string[];
}

const TranslatableTextArea: React.FC<TranslatableTextAreaProps> = ({
  className,
  label,
  locales = ["en", "ar"],
  name,
  ...props
}) => {
  let [showText, setShowText] = useState("en");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowText(event.target.value);
  };

  return (
    <div className="flex items-center">
      <select onChange={handleChange} className="ltr:select select-bordered rtl:w-[75px] rtl:h-[48px] rtl:text-center cursor-pointer focus:border-blue-500 focus:border-2 rounded-xl">
        {locales.map((e: string, index: number) => {
          return (
            <option key={index} value={e} className='cursor-pointer'>
              {e}
            </option>
          );
        })}
      </select>

        {locales.map((e: string, index: number) => {
          return (
            <TextArea
                key={index}
                dir={showText=="ar"?'rtl':'ltr'}
              label={label +" : "+ e.toUpperCase()}
              name={`${name}.${e}`}
              className={e == showText ? "!block w-full ltr:pl-3 rtl:pr-3" : "!hidden"}
            />
          );
        })}

    </div>
  );
};

export default TranslatableTextArea;
