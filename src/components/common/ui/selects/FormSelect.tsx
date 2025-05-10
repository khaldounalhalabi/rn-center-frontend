"use client";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import React, { HTMLProps } from "react";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string;
  items: string[] | number[] | undefined;
  label?: string;
  translatable?: boolean;
}

const FormSelect: React.FC<SelectProps> = ({
  name,
  items,
  label,
  translatable = false,
  ...props
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
    register,
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={"flex flex-col items-start w-full"}>
      <label className={"label text-nowrap"}>{label}</label>
      <select
        className={"select select-bordered w-full"}
        {...props}
        {...register(name)}
      >
        {items?.map((item, index) => (
          <option value={item} key={index}>
            {translatable ? <TranslatableEnum value={`${item}`} /> : item}
          </option>
        ))}
      </select>
      {error ? <p className={"text-error"}>{error}</p> : ""}
    </div>
  );
};

export default FormSelect;
