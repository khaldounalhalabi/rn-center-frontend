"use client";
import React from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { POST } from "@/Http/Http";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Form from "../ui/Form";

const VerificationEmailCode = ({
  url,
  urlResendCode,
}: {
  url: string;
  urlResendCode: string;
  pageType: string;
}) => {
  const handleSubmit = (data: { verificationCode: string }) => {
    return AuthService.make().requestVerificationCode(url, data);
  };
  const handleResendVerCode = () => {
    const email = {
      email: window.localStorage.getItem("customer"),
    };
    return POST(urlResendCode, email);
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
          <h1 className="text-2xl font-bold sm:text-3xl">Verification Email</h1>
          <h4 className="mt-4 text-gray-500">Enter Verification Code</h4>
        </div>

        <Form handleSubmit={handleSubmit}>
          <Input
            name="verificationCode"
            type="text"
            placeholder="Enter Verification Code"
          />

          <div className={`flex justify-center items-center mt-3`}>
            <PrimaryButton type={"submit"}>Submit</PrimaryButton>
          </div>
          <div className="w-full text-left">
            <p
              onClick={handleResendVerCode}
              className="pl-2 mt-3 cursor-pointer text-sm text-blue-600"
            >
              Resend The code ?
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerificationEmailCode;
