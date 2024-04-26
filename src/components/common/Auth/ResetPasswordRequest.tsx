"use client";
import React from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { AuthService } from "@/services/AuthService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Form from "../ui/Form";

const ResetPasswordRequest = ({
  url,
  typePage,
}: {
  url: string;
  typePage: string;
}) => {
  const handleSubmit = (data: { email: string }) => {
    window.localStorage.setItem(typePage, data.email);

    return AuthService.make().requestResetPasswordRequest(url, data, typePage);
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
        <Form handleSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            label="Email :"
            placeholder="Enter Email"
          />
          <div className={`flex justify-center items-center mt-3`}>
            <PrimaryButton type={"submit"}>Submit</PrimaryButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
