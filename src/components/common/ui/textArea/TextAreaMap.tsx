import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
}

const TextAreaMap: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,

  ...props
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  return (
    <div className={className}>
      {label ? <label className={"label"}>{label}</label> : ""}
      <textarea
        {...props}
        id="message"
        rows={4}
        dir={dir}
        className="text-sm textarea textarea-bordered w-full"
        placeholder="Paste Your Map Location Iframe"
        {...register(name)}
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TextAreaMap;
