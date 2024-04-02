"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";

const Form = ({
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
}: {
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess: (res: ApiResponse<any>) => void;
}) => {
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });
  const onSubmit = async (data: any) => {
    console.log(data);
    const res = await handleSubmit(data);
    if (!res.fillValidationErrors(methods) && res?.data?.id) {
      onSuccess(res);
    }
    return res;
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
