"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";

const Form = ({
                className,
    button=undefined,
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
  buttonText = "Submit",
                NewButton,
  setLocale = undefined,
  showToastMessage = true,
}: {
  className?:string
  button?:string
  NewButton?:any
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess?: (res: ApiResponse<any>) => void;
  buttonText?: string;
  setLocale?: React.Dispatch<"en" | "ar">;
  showToastMessage?: boolean;
}) => {
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = async (data: any) => {
    const res = await handleSubmit(data);

    if (!res.hasValidationErrors() && res.code == 200) {
      if (showToastMessage) {
        toast.success((res?.message as string) ?? "success");
      }
      if (onSuccess) onSuccess(res);
    } else {
      res.fillValidationErrors(methods);
    }
    return res;
  };

  const [lang, setLang] = useState<"en" | "ar">("en");
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
          <div className="h-8 w-full flex-row flex justify-center items-center">
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
          className="flex justify-center items-center my-5"
          onClick={() => {
            methods.clearErrors();
          }}
        >
          {button ? (
            <button
              type="submit"
              disabled={methods.formState.isSubmitting}
              className={`${button}`}
            >
              {NewButton}
              {buttonText}{" "}
            </button>
          ) : (
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
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;