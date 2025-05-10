import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
  defaultValue?: any;
  required?: boolean;
}

const FormTextarea: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,
  defaultValue,
  required = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}.message`);
  return (
    <div className={className}>
      {label ? (
        <label className={"label w-fit"}>
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : false} :
        </label>
      ) : (
        ""
      )}
      <textarea
        {...props}
        {...register(`${name}`)}
        id="message"
        rows={4}
        dir={dir}
        className="text-sm textarea textarea-bordered w-full"
        defaultValue={defaultValue ? defaultValue : ""}
      />
      {error ? <p className={`text-error text-sm`}>{error}</p> : ""}
    </div>
  );
};

export default FormTextarea;
