"use client";
import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";

interface RadioOption {
  label: string | React.ReactNode;
  value: string | number;
}

interface RadioProps extends HTMLProps<HTMLInputElement> {
  name: string;
  options: RadioOption[];
  label?: string;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  name,
  options,
  label,
  className = "radio radio-info",
  ...props
}) => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}.message`);
  const defaultValue = getNestedPropertyValue(defaultValues, name);

  return (
    <div className="flex w-full items-center gap-5 self-end">
      {label && (
        <label className="rounded-md bg-pom p-3 text-white">{label}</label>
      )}
      <div className="flex items-center gap-5">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              className={className}
              defaultChecked={
                defaultValue ? defaultValue === option.value : index == 0
              }
              {...props}
            />
            <label className="label-text">{option.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default Radio;
