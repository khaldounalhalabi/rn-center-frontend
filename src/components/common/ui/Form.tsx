"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { navigate } from "@/Actions/navigate";
import PrimaryButton from "./PrimaryButton";

const Form = ({
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
  buttonText = "Submit",
}: {
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess?: (res: ApiResponse<any>) => void;
  buttonText?: string;
}) => {
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = async (data: any) => {
    const res = await handleSubmit(data);

    if (!res.hasValidationErrors()) {
      if (onSuccess) onSuccess(res);
    }

    await navigate("").then(() => {
      res.fillValidationErrors(methods);
      return res;
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {children}
        <div className="flex justify-center items-center my-5">
          <PrimaryButton
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            {buttonText}{" "}
            {methods.formState.isSubmitting ? (
              <span className="mx-1">
                <LoadingSpin className="w-6 h-6 text-white" />
              </span>
            ) : (
              ""
            )}
          </PrimaryButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
