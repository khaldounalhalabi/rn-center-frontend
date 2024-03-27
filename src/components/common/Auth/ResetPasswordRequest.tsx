"use client";
import React, {useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import { AuthService } from "@/services/AuthService";
import {getValidationError} from "@/Http/QueryFetch";
import PrimaryButton from "@/components/common/ui/PrimaryButton";



const ResetPasswordRequest = ({
  url,
  typePage,
}: {
  url: string;
  typePage: string;
}) => {

  const [response, setResponse] = useState<any>(undefined);

  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await AuthService.make().requestResetPasswordRequest(
        url,
        data,
        typePage,
    );
    window.localStorage.setItem(typePage, data.email);
    console.log(res)
    if (res) setResponse(res);
  };
  return (
    <div
      className="w-[100wh] h-[100vh] relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute -translate-x-1/2 top-[20%] left-1/2 bg-white rounded-2xl">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
          <h4 className="mt-4 text-gray-500">Enter your Email Address</h4>
        </div>
       <FormProvider {...methods}>
         <form
             onSubmit={methods.handleSubmit(onSubmit)}
         >
           <Input
               name="email"
               type="text"
               label="Email :"
               placeholder="Enter Email"
               error={getValidationError("email", response)}

           ></Input>
           <div className={`flex justify-center items-center mt-3`}>
             <PrimaryButton type={"submit"}>Submit</PrimaryButton>
           </div>
         </form>
       </FormProvider>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
