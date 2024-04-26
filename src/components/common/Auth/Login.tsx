"use client";
import React from "react";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";
import Form from "@/components/common/ui/Form";
import { Link } from "@/i18Router";
import { swal } from "@/Helpers/UIHelpers";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse } from "@/Models/User";

const Login = ({ url, pageType }: { url: string; pageType: string }) => {
  const onSubmit = async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    return await AuthService.make().login(url, data, pageType);
  };

  swal.fire({
    title: "Wrong Credentials",
    text: "Your Credentials Didn't Match Our Records",
    icon: "error",
  });

  return (
    <div className="relative w-[100wh] h-[100vh]">
      <div className="top-[20%] left-1/2 absolute bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">Sing In</h1>
          <h4 className="mt-4 text-gray-500">Welcome Back !</h4>
        </div>
        <Form handleSubmit={onSubmit}>
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
          <div className="flex justify-center opacity-80 mt-4">
            <h4> Forget Password ? </h4>
            <Link
              href={`/auth/${pageType}/reset-password`}
              className="text-blue-600"
            >
              Reset Password
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
