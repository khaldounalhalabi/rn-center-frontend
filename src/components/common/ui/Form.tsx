"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { navigate } from "@/Actions/navigate";

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
    if (!res.hasValidationErrors()) {
      if (onSuccess) onSuccess(res);
    }
    return navigate("").then(() => {
      res.fillValidationErrors(methods);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {methods.formState.isSubmitting && (
          <div className="z-50 absolute inset-0 flex justify-center items-center bg-transparent/5 rounded-md">
            <LoadingSpin className="w-8 h-8" />
          </div>
        )}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
