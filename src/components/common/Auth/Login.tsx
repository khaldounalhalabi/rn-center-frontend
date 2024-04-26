"use client";
import React from "react";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import { Link } from "@/i18Router";
import { swal } from "@/Helpers/UIHelpers";
import { FormProvider, useForm } from "react-hook-form";
import LoadingSpin from "@/components/icons/LoadingSpin";

const Login = ({ url, pageType }: { url: string; pageType: string }) => {
  const methods = useForm<{ email: string; password: string }>();

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await AuthService.make().login(url, data, pageType);

    if (res.code == 401) {
      swal.fire(
        "Wrong Credentials",
        "The Provided Credentials Didn't Match Our Records",
        "error"
      );
    }
  };

  return (
    <div className="relative w-[100wh] h-[100vh]">
      <div className="top-[20%] left-1/2 absolute bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">Sing In</h1>
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
              <PrimaryButton type={"submit"}>
                Log In
                {methods.formState.isSubmitting ? (
                  <span className="mx-1">
                    <LoadingSpin className="w-6 h-6 text-white" />
                  </span>
                ) : (
                  ""
                )}
              </PrimaryButton>
            </div>
            <div className="flex justify-center opacity-80 mt-4">
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
