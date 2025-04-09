"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

const Form = ({
  className,
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
  buttonText = undefined,
  setLocale = undefined,
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
        toast.success((res?.message as string) ?? "success");
      }
      if (onSuccess) onSuccess(res);
    } else {
      res.fillValidationErrors(methods);
    }
    return res;
  };

  const locale = useLocale() as "en" | "ar";
  const [lang, setLang] = useState<"en" | "ar">(locale);
  useEffect(() => {
    if (setLocale) {
      setLocale(lang);
    }
  }, [lang]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className={`${className}`}
      >
        {setLocale ? (
          <div
            dir="ltr"
            className="h-8 w-full flex-row flex justify-center items-center"
          >
            <div className="w-36  h-8 flex">
              <p
                className={`w-1/2 h-full pt-1 rounded-l-2xl text-center cursor-pointer ${lang == "en" ? "bg-black text-white" : "bg-gray-300 text-black "}`}
                onClick={() => setLang("en")}
              >
                English
              </p>
              <p
                className={`w-1/2 h-full pt-1 rounded-r-2xl text-center cursor-pointer ${lang == "ar" ? "bg-black text-white" : "bg-gray-300 text-black "}`}
                onClick={() => setLang("ar")}
              >
                Arabic
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {children}
        <div
          className={`flex ${submitButtonClasses} items-center my-5`}
          onClick={() => {
            methods.clearErrors();
          }}
        >
          {otherSubmitButton
            ? otherSubmitButton(methods.formState.isSubmitting)
            : ""}
          {defaultButton && (
            <PrimaryButton
              type="submit"
              disabled={methods.formState.isSubmitting || disabled}
            >
              {buttonText}{" "}
              {methods.formState.isSubmitting && (
                <span className="mx-1">
                  <LoadingSpin className="w-6 h-6 text-white" />
                </span>
              )}
            </PrimaryButton>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
