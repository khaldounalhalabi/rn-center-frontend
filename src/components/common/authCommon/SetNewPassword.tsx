"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import { useRouter } from "next/navigation";
import handleErrorType from "@/hooks/handleErrorType";
import LoadingSpin from "@/components/icons/loadingSpin";
import { useMutation } from "react-query";
import { POST } from "@/Http/QueryFetch";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

type FormType = {
  password: string;
  password_confirmation: string;
};

const SetNewPassword = ({
  url,
  pageType,
}: {
  url: string;
  pageType: string;
}) => {
  const form = useForm<FormType>({
    defaultValues: {
      password_confirmation: "",
      password: "",
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;
  const mutation = useMutation(
    async (dataForm: FormType): Promise<ApiResult<User>> =>
      await POST(url, dataForm),
  );

  const { isLoading, data } = mutation;
  const history = useRouter();

  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    const code = window.localStorage.getItem(pageType + "code");
    const dataSend = {
      reset_password_code: code,
      password: dataForm.password,
      password_confirmation: dataForm.password_confirmation,
    };

    mutation.mutate(dataSend, {
      onSuccess: (data) => {
        if (data?.code == 200) {
          history.push(`/auth/${pageType}/login`);
        }
      },
    });
  };

  const status = data?.status;

  if (isLoading) {
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
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
        </div>
        <p
          className={`w-full pl-3 h-12 text-sm   mt-3 ${status ? "text-green-500" : "text-red-800"}`}
        >
          {handleErrorType(status, data)}
        </p>

        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <InputControl
            container="w-full h-20 my-4 relative "
            id="password"
            type={"text"}
            register={register}
            options={{
              value: true,
              required: "Password is Required",
            }}
            className={
              errors.password?.message
                ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
            }
            placeholder="Enter New Password"
          >
            <p className="w-full pl-3  text-red-800  mt-3">
              {errors.password?.message}
            </p>
          </InputControl>
          <InputControl
            container="w-full h-20 my-4 "
            id="password_confirmation"
            type="text"
            register={register}
            options={{
              value: true,
              required: "Reset Password is Required",
            }}
            className={
              errors.password_confirmation?.message
                ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
            }
            placeholder="Reset New Password"
          >
            <p className="w-full pl-3   text-red-800  mt-3">
              {errors.password_confirmation?.message}
            </p>
          </InputControl>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Save
          </button>
        </FormContainer>
      </div>
    </div>
  );
};

export default SetNewPassword;
