"use client";
import React, { ReactNode } from "react";
import Select from "@/components/common/ui/select";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    container: string;
    register: any;
    options: any;
    error: string | undefined;
    children?: ReactNode | null | undefined;
    label?: any;
    data:any,
}

const SelectControl: React.FC<InputProps> = ({ ...props }) => {
    return (
        <div className={props.container}>
            {props.label ? <label className="label">{props.label}</label> : false}
            <Select

                {...props}/>
            <p className="w-full pl-3   text-red-800  mt-3">{props.error}</p>
            {props.children}
        </div>
    );
};

export default SelectControl;
