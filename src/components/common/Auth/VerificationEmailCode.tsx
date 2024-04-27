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
      className="relative w-[100wh] h-[100vh]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="top-[20%] left-1/2 absolute bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">Verification Email</h1>
          <h4 className="mt-4 text-gray-500">Enter Verification Code</h4>
        </div>

        <Form handleSubmit={handleSubmit}>
          <Input
            name="verificationCode"
            type="text"
            placeholder="Enter Verification Code"
          />

          
          <div className="w-full text-left">
            <p
              onClick={handleResendVerCode}
              className="mt-3 pl-2 text-blue-600 text-sm cursor-pointer"
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
