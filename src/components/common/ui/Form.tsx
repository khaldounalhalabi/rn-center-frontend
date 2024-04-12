"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";

const Form = ({
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
}: {
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess?: (res: ApiResponse<any>) => void;
}) => {
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = async (data: any) => {
    const res = await handleSubmit(data);
    if (!res.fillValidationErrors(methods)) {
      if (onSuccess) onSuccess(res);
    }
    console.log(res)
    return res;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {methods.formState.isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent/5 rounded-md">
            <LoadingSpin className="w-8 h-8 " />
          </div>
        )}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
