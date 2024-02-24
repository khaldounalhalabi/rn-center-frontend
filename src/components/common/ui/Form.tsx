"use client";
import React, { HTMLAttributes, useEffect } from "react";
import { ApiResponseMessage } from "@/Http/Response";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: React.ReactNode;
  onSubmit?: (data: any, reset: () => void) => void;
  errors?: ApiResponseMessage;
  defaultValues?: any;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  errors,
  defaultValues,
  ...props
}) => {
  const form = useForm(defaultValues);
  useEffect(() => {
    if (errors) {
      for (const field in errors.errors) {
        form.setError(field, { message: errors.errors[field].join(" - ") });
      }
    }
  }, [errors]);

  const internalOnSubmit = (data: any) => {
    onSubmit?.(data, form.reset);
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(internalOnSubmit) : undefined}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
