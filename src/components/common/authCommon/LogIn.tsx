"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "@/components/common/ui/FormContenar";
import InputControl from "@/components/common/ui/InputControl";
import EyeIcon from "@/components/icons/eye";
import OpenAndClose from "@/hooks/OpenAndClose";
import CloseEyeIcon from "@/components/icons/closeEye";
import { useMutation } from "react-query";
import { POST } from "@/Http/QueryFetch";
import LoadingSpin from "@/components/icons/loadingSpin";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

type FormType = {
  email: string;
  password: string;
};

const LogIn = ({
  url,
  pageType,
}: {
  url: string;
  typeHeaders: string;
  pageType: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormType>({
    defaultValues: {
      email: "",
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
  const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
    mutation.mutate(dataForm);
  };
  const response = data;

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
      <div
        className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2
                     bg-white rounded-2xl"
      >
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sing In</h1>
          <h4 className="mt-4 text-gray-500">Welcome Back !</h4>
        </div>
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col "
          noValidate
        >
          <InputControl
            container="w-full h-20 my-4 "
            id="email"
            type="text"
            register={register}
            options={{
              value: true,
              required: "Email is Required",
            }}
            className={
              errors.email?.message
                ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
            }
            placeholder="Enter Email"
          >
            <p className="w-full pl-3   text-red-800  mt-3">
              {errors.email?.message}
            </p>
          </InputControl>
          <InputControl
            container="w-full h-20 my-4 relative "
            id="password"
            type={showPassword ? "text" : "password"}
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
            placeholder="Enter Password"
          >
            <div className="absolute top-[15%] z-20 right-0 w-10 h-full">
              <EyeIcon
                onClick={() => OpenAndClose(showPassword, setShowPassword)}
                className={
                  showPassword
                    ? "w-6 h-6 opacity-60 cursor-pointer hover:opacity-80"
                    : "hidden"
                }
              />
              <CloseEyeIcon
                onClick={() => OpenAndClose(showPassword, setShowPassword)}
                className={
                  showPassword
                    ? "hidden"
                    : "w-6 h-6 opacity-60 cursor-pointer hover:opacity-80"
                }
              />
            </div>
            <p className="w-full pl-3  text-red-800  mt-3">
              {errors.password?.message}
            </p>
          </InputControl>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Log In
          </button>
          <div className="flex justify-center mt-4 opacity-80">
            <h4> Forget Password ? </h4>
            <Link
              href={`/auth/${pageType}/resetPassword`}
              className="text-blue-600"
            >
              Reset Password
            </Link>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default LogIn;
