import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
  defaultValue?: any;
}

const TextAreaMap: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,
  defaultValue,
  ...props
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);

  const [area, setArea] = useState("");
  const handleRemoveStyle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArea(e.target.value);
    area.replace(/style="border:0;"/, "");
    setValue(name, area);
  };
  return (
    <div className={className}>
      {label ? <label className={"label"}>{label}</label> : ""}
      <textarea
        {...props}
        onChange={handleRemoveStyle}
        id="message"
        rows={4}
        dir={dir}
        className="text-sm textarea textarea-bordered w-full"
        placeholder="Write your thoughts here..."
        defaultValue={defaultValue ? defaultValue : ""}
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TextAreaMap;
