"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/Http/QueryFetch";
import { useRouter } from "next/navigation";
import handleErrorType from "@/hooks/handleErrorType";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

type FormType = {
  verificationCode: string;
};

const VerificationEmailCode = ({
  url,
  urlResendCode,
  pageType,
}: {
  url: string;
  urlResendCode: string;
  pageType: string;
}) => {
  const form = useForm<FormType>({
    defaultValues: {
      verificationCode: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [pageType],
    mutationFn: async (dataForm: FormType) => {
      return await POST(url, dataForm).then((e) => {
        e.code == 200 ? history.push(`/customer`) : false;
        return e;
      });
    },
  });
  const history = useRouter();

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutate(dataForm);
  };
  const handleResendVerCode = () => {
    const email = {
      email: window.localStorage.getItem("customer"),
    };
    return POST(urlResendCode, email);
  };

  if (isPending) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
      </div>
    );
  }

  return (
    <div
      className="w-[100wh] h-[100vh] relative "
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute bg-white rounded-2xl -translate-x-1/2 top-[20%] left-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Verification Email</h1>
          <h4 className="mt-4 text-gray-500">Enter Verification Code</h4>
        </div>
        <p className="text-red-400 text-sm p-3">
          {handleErrorType(pageType, data)}
        </p>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <InputControl
            container="w-full h-20 my-4 "
            id="verificationCode"
            type="text"
            register={register}
            options={{
              value: true,
              required: "Verification Code is Required",
            }}
            error={errors.verificationCode?.message}
            placeholder="Enter Verification Code"
          />

          <div className="w-full text-center">
            <button
              type="submit"
              className="w-full md:w-1/2 inline-block mt-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
          </div>
          <div className="w-full text-left">
            <p
              onClick={handleResendVerCode}
              className="pl-2 mt-3 cursor-pointer text-sm text-blue-600"
            >
              Resend The code ?
            </p>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default VerificationEmailCode;
