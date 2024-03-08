"use client";

import Input from "@/components/common/ui/Input";
import React from "react";

type prop = {
  container: string;
  className: string;
  id: string;
  type: string;
  placeholder: string;
  register: any;
  options: any;
};
const InputControl: React.FC<any> = ({ children, ...props }) => {
  return (
    <div className={props.container}>
      <Input {...props} />
      {children}
    </div>
  );
};

export default InputControl;
