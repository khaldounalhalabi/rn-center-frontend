"use client";
import React, {useEffect, useState} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "@/Http/Response";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";

const Form = ({
  children,
  handleSubmit,
  onSuccess,
  defaultValues = {},
  buttonText = "Submit",
    setLocale = undefined
}: {
  children: React.ReactNode;
  handleSubmit: (data: any) => Promise<ApiResponse<any>>;
  defaultValues?: object | undefined | null;
  onSuccess?: (res: ApiResponse<any>) => void;
  buttonText?: string;
  setLocale?:React.Dispatch<"en"|"ar">
}) => {
  // @ts-ignore
  const methods = useForm({ defaultValues: defaultValues });

  const onSubmit = async (data: any) => {
    const res = await handleSubmit(data);

    if (!res.hasValidationErrors() && res.code == 200) {
      toast.success((res?.message as string) ?? "success");
      if (onSuccess) onSuccess(res);
    } else {
      res.fillValidationErrors(methods);
    }
    return res;
  };

  const [lang,setLang] = useState<"en"|"ar">('en')
  useEffect(()=>{
    if(setLocale){
      setLocale(lang)
    }
  },[lang])
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {setLocale?
            <div className='h-8 w-full flex-row flex justify-center items-center'>
              <span className='mx-2'>EN</span>
              <input type="radio" name="radio-1" className="radio mx-1" checked={lang == "en"} onChange={()=>setLang('en')}/>
              <input type="radio" name="radio-1" className="radio mx-1" checked={lang == "ar"} onChange={()=>setLang('ar')}/>
              <span className='mx-2'>AR</span>
            </div>
        :""}
        {children}
        <div
          className="flex justify-center items-center my-5"
          onClick={() => {
            methods.clearErrors();
          }}
        >
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