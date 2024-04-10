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
const TextArea: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div className={className}>
      {label ? <label className={"label"}>{label}</label> : ""}
      <textarea
        {...props}
        {...register(`${name}`)}
        id="message"
        rows={4}
        dir={dir}
        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Write your thoughts here..."
        defaultValue={""}
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default TextArea;
