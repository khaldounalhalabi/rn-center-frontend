"use client";
import Input from "@/components/common/ui/Input";
import React, { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  container: string;
  register: any;
  options?: any;
  error: string | undefined;
  children?: ReactNode | null | undefined;
  label?: any;
}

const InputControl: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className={props.container}>
      {props.label ? <label className="label">{props.label}</label> : false}
      <Input
        className={
          props.error
            ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
            : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
        }
        {...props}
      />
      <p className="w-full pl-3   text-red-800  mt-3">{props.error}</p>
      {props.children}
    </div>
  );
};

export default InputControl;
