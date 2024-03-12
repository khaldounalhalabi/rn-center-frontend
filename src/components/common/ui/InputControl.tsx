"use client";
import Input from "@/components/common/ui/Input";
import React, { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  container: string;
  register: any;
  options: any;
  children?: ReactNode | null | undefined;
}

const InputControl: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className={props.container}>
      <Input {...props} />
      {props.children}
    </div>
  );
};

export default InputControl;
