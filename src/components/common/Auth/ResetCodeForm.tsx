"use client";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import { POST } from "@/Http/QueryFetch";
import HandleTimer from "@/hooks/HandleTimer";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";

const ResetCodeForm = ({
  url,
  urlResendCode,
  pageType,
}: {
  url: string;
  urlResendCode: string;
  pageType: string;
}) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  HandleTimer(minutes, seconds, setMinutes, setSeconds);
  const HandleClickResetButton = () => {
    setMinutes(1);
    setSeconds(0);
    const email = {
      email: window.localStorage.getItem(pageType),
    };
    return POST(urlResendCode, email);
  };

  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    AuthService.make()
      .submitResetCode(url, data, pageType)
      .then((res) => res.fillValidationErrors(methods));
    window.localStorage.setItem(pageType + "code", data.reset_password_code);
  };
  return (
    <div
      className="w-[100wh] h-[100vh] relative "
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2 bg-white rounded-2xl">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Reset Password Code
          </h1>
          <h4 className="mt-4 text-gray-500">Enter Reset Password Code</h4>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
              name="reset_password_code"
              type="text"
              label="Code :"
              placeholder="Enter Reset Code"
            ></Input>
            <div className="w-1/2 pl-2">
              <p>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </div>
            <div className="w-full text-center">
              <div className={`flex justify-center items-center mt-3`}>
                <PrimaryButton type={"submit"}>Submit</PrimaryButton>
              </div>
            </div>
            <div className="w-full text-left">
              <p
                onClick={HandleClickResetButton}
                className="pl-2 mt-3 cursor-pointer text-sm text-blue-600"
              >
                Resend The code ?
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetCodeForm;
