import React, {useEffect, useState} from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
  required?:boolean
}

const TextAreaMap: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,
                                               required=false,

  ...props
}) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);
  const [value,setValueText]=useState('')
  useEffect(()=>{
    setValue(name,value)
  },[value])

  return (
    <div className={className}>
      {label ? <label className={"label"}>{label}{required?<span className='ml-1 text-red-600'>*</span>:false}</label> : ""}
      <textarea
        {...props}
        id="message"
        rows={4}
        dir={dir}
        className="text-sm textarea textarea-bordered w-full"
        placeholder="Paste Your Map Location Iframe"
        onChange={(e)=>setValueText(e.target.value)}
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TextAreaMap;
