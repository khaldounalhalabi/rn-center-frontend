"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";

const SetNewPassword = ({
  url,
  pageType,
}: {
  url: string;
  pageType: string;
}) => {
  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const code = window.localStorage.getItem(pageType + "code");
    const dataSend = {
      reset_password_code: code,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    AuthService.make()
      .setNewPassword(url, dataSend, pageType)
      .then((res) => res.fillValidationErrors(methods));
  };
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
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={"flex flex-col gap-5"}>
              <Input
                name="password"
                type={"text"}
                label="Password :"
                placeholder="Enter New Password"
              />
              <Input
                name="password_confirmation"
                type="text"
                label="Confirmation Password :"
                placeholder="Reset New Password"
              />
            </div>
            <div className={`flex justify-center items-center mt-3`}>
              <PrimaryButton type={"submit"}>Save</PrimaryButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SetNewPassword;
