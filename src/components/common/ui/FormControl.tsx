import React, { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

export interface FormControlProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  label?: string;
}

const FormControl: React.FC<FormControlProps> = ({
  name,
  children,
  label,
  ...rest
}) => {
  const formContext = useFormContext();
  return (
    <div className={`gap-2 ${rest?.className} `}>
      {label && (
        <label className="label">
          <span className="text-sm text-text-secondary ">{label}</span>
        </label>
      )}
      {children}
      {formContext && formContext.formState.errors[name] && (
        <label className="my-3 text-red-400">
          {formContext.formState.errors[name]?.message?.toString()}
        </label>
      )}
    </div>
  );
};

export default FormControl;
