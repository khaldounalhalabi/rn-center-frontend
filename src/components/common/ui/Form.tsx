"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";
import { toast } from "sonner";

const Form = ({
  className,
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
  buttonText = undefined,
  showToastMessage = true,
  disabled = false,
  defaultButton = true,
  otherSubmitButton = undefined,
  submitButtonClasses = "justify-center",
}: {
  className?: string;
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess?: (res: ApiResponse<any>) => void;
  buttonText?: string;
  setLocale?: React.Dispatch<"en" | "ar">;
  showToastMessage?: boolean;
  disabled?: boolean;
  defaultButton?: boolean;
  otherSubmitButton?: (isSubmitting: boolean) => React.ReactNode;
  submitButtonClasses?: string;
}) => {
  const t = useTranslations("components");
  if (!buttonText) {
    buttonText = t("submit");
  }
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = async (data: any) => {
    const res = await handleSubmit(data);

    if (!res) {
      return;
    }

    if (!res?.hasValidationErrors() && res.code == 200) {
      if (showToastMessage) {
        toast(t("success"), {
          description: res?.message as string,
        });
      }
      if (onSuccess) onSuccess(res);
    } else {
      res.fillValidationErrors(methods);
      toast(t("error"), {
        description: t("check_data"),
        dismissible:true
      });
    }
    return res;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className={`${className}`}
      >
        {children}
        <div
          className={`flex ${submitButtonClasses} my-5 items-center`}
          onClick={() => {
            methods.clearErrors();
          }}
        >
          {otherSubmitButton
            ? otherSubmitButton(methods.formState.isSubmitting)
            : ""}
          {defaultButton && (
            <Button
              type="submit"
              disabled={methods.formState.isSubmitting || disabled}
            >
              {buttonText}{" "}
              {methods.formState.isSubmitting && (
                <span className="mx-1">
                  <LoadingSpin className="h-6 w-6" />
                </span>
              )}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
