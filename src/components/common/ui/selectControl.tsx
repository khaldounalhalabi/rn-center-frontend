"use client";
import React, { ReactNode } from "react";
import Select from "@/components/common/ui/select";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className:string
    children?: ReactNode | null | undefined;
    label?: any;
    selectValue:string ,
    setSelectValue:React.Dispatch<string>,
    error:String,
    data:any,
}

const SelectControl: React.FC<InputProps> = ({ ...props }) => {
    return (
      <div className={props.className}>
        {props.label ? <label className="label">{props.label}</label> : false}
        <Select {...props} />
        {props.error?<p className="w-full pl-3   text-red-800  mt-3">{props.error}</p>:false}
        {props.children}
      </div>
    );
};

export default SelectControl;
