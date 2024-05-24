"use client";
import React, { useState } from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import { POST } from "@/Http/Http";
import { Navigate } from "@/Actions/navigate";
import { setCookieClient } from "@/Actions/clientCookies";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse } from "@/Models/User";

const Login = ({ url, pageType }: { url: string; pageType: string }) => {
  const [error, setError] = useState(false);
  const handleSubmit = (data: { email: string; password: string }) => {
    setError(false);
    return POST<AuthResponse>(url, data).then((res: any) => {
      if (res.code == 401) {
        setError(true);
        return res;
      } else {
        return res;
      }
    });
  };

  const handleSuccess = (data: ApiResponse<AuthResponse>) => {
    setCookieClient("token", data?.data?.token ?? "");
    setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
    setCookieClient("user-type", pageType);
    Navigate("/admin");
  };

  return (
    <div className="relative w-[100wh] h-[100vh]">
      <div className="top-[20%] left-1/2 absolute bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">Sing In</h1>
          <h4 className="mt-4 text-gray-500">Welcome Back !</h4>
        </div>
        <Form
          handleSubmit={handleSubmit}
          onSuccess={handleSuccess}
          buttonText={"Login"}
        >
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

          {error ? (
            <p className="my-3 p-2 w-full text-error text-sm">
              Incorrect email or password.
            </p>
          ) : (
            false
          )}

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