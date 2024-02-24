"use client";

import React, { ComponentPropsWithoutRef, forwardRef, HTMLProps } from "react";
import FormControl from "@/components/common/ui/FormControl";
import { useFormContext } from "react-hook-form";

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  function Input(props, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={`${props.className} input input-bordered border-background-stroke rounded-md border bg-background-textfield  transition`}
      />
    );
  },
);
export default Input;

export const InputField: React.FC<
  Omit<ComponentPropsWithoutRef<"input">, "onChange" | "value"> & {
    name: string;
    label?: string;
  }
> = ({ name, label, ...props }) => {
  const formContext = useFormContext();
  return (
    <FormControl name={name} label={label}>
      <Input {...formContext.register(name)} {...props} />
    </FormControl>
  );
};
