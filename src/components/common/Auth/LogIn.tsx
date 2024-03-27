"use client";
import React, { useState } from "react";
import Link from "next/link";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import { AuthService } from "@/services/AuthService";
import {getValidationError} from "@/Http/QueryFetch";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Input from "@/components/common/ui/Inputs/Input";



const LogIn = ({ url, pageType }: { url: string; pageType: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm();
  const [response, setResponse] = useState<any>(undefined);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await AuthService.make().login(url, data, pageType);
    if (res) setResponse(res);
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
             <Input
                 name='email'
                 type="email"
                 label="Email :"
                 error={getValidationError("email", response)}
                 placeholder="Enter Your Email"
             />
             <Input
                 name='password'
                 label="Password : "
                 type={showPassword ? "text" : "password"}
                 error={getValidationError("password", response)}
                 placeholder="Enter Your Password"
             />
             <div className={`flex justify-center items-center mt-3`}>
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

export default LogIn;
