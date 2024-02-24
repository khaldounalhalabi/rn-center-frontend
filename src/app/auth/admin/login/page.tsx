"use client";
import React, { useState } from "react";
import Form from "@/components/common/ui/Form";
import { InputField } from "@/components/common/ui/Input";
import { SubmitHandler } from "react-hook-form";
import { Http } from "@/Http/Http";
import { navigate } from "@/Actions/navigate";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmits: SubmitHandler<{ name: string; password: string }> = (
    data,
  ) => {
    const response = new Http().post(data, "/admin/login");
    setIsLoading(true);
    response.then((data) => {
      localStorage.setItem("token", data.data.token);
      navigate("/admin").then(() => {
        setIsLoading(false);
      });
    });
  };

  return (
    <div className={`md:grid md:grid-cols-6`}>
      <div className="md:col-start-3 md:col-end-5 px-4 my-8 py-16 sm:px-6 lg:px-8 shadow-md">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>

          <p className="mt-4 text-gray-500">Welcome Back !</p>
        </div>
        {isLoading ? (
          // Show spinner when loading is true
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Form
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={(data) => {
              onSubmits(data);
            }}
          >
            <InputField
              name={`email`}
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
              placeholder="Enter email"
            />

            <InputField
              type={`password`}
              name={`password`}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Forget Password ?
                <a className="underline" href="#">
                  Reset Password
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Page;
