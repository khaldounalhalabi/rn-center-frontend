"use client";
import React, { HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  type: string;
  onChange:any
  min?: number;
}

const InputFilter: React.FC<InputProps> = ({
  className,
                                             onChange,
  type,
  min = 0,
  ...props
}) => {
  return (
    <div className={`flex flex-col items-start w-full`}>
      <input
        {...props}
          onChange={onChange}
        className={
          className ??
          `input input-bordered w-full focus:outline-pom focus:border-pom`
        }
        min={min}
        type={type}
        step={"any"}
      />
    </div>
  );
};

export default InputFilter;