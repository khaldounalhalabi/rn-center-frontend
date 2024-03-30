"use client";
import React from "react";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";

const Login = ({ url, pageType }: { url: string; pageType: string }) => {
  const methods = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    AuthService.make()
      .login(url, data, pageType)
      .then((res) => res.fillValidationErrors(methods));
  };

  return (
    <div className="w-[100wh] h-[100vh] relative ">
      <div
        className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2
                     bg-white rounded-2xl"
      >
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sing In</h1>
          <h4 className="mt-4 text-gray-500">Welcome Back !</h4>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={"flex flex-col gap-5"}>
              <Input
                name="email"
                type="email"
                label="Email :"
                placeholder="Enter Your Email"
              />
              <Input
                name="password"
                label="Password : "
                type={"password"}
                placeholder="Enter Your Password"
              />
            </div>
            <div className={`flex justify-center items-center mt-5`}>
              <PrimaryButton type={"submit"}>Log In</PrimaryButton>
            </div>
            <div className="flex justify-center mt-4 opacity-80">
              <h4> Forget Password ? </h4>
              <Link
                href={`/auth/${pageType}/reset-password`}
                className="text-blue-600"
              >
                Reset Password
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default Login;
