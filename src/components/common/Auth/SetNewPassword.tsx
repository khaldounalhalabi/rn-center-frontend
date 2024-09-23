"use client";
import React from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { AuthService } from "@/services/AuthService";
import Form from "../ui/Form";
import { useTranslations } from "next-intl";

const SetNewPassword = ({
  url,
  pageType,
}: {
  url: string;
  pageType: string;
}) => {
  const handleSubmit = (data: {
    reset_password_code: string;
    password: string;
    password_confirmation: string;
  }) => {
    const code = window.localStorage.getItem(pageType + "code");
    const dataSend = {
      reset_password_code: code,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    return AuthService.make<AuthService>().setNewPassword(
      url,
      dataSend,
      pageType,
    );
  };
  const t = useTranslations("auth");
  return (
    <div
      className="w-[100wh] h-[100vh] relative "
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="w-full md:w-6/12 max-w-[455px] p-8 absolute bg-white rounded-2xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-full mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t("resetPassword")}
          </h1>
        </div>
        <Form handleSubmit={handleSubmit} buttonText={t("save")}>
          <div className={"flex flex-col gap-5"}>
            <Input
              name="password"
              type={"text"}
              label={t("password")}
              placeholder="Enter New Password"
            />
            <Input
              name="password_confirmation"
              type="text"
              label={t("confirm-password")}
              placeholder="Reset New Password"
            />
          </div>
          <div className={`flex justify-center items-center mt-3`}></div>
        </Form>
      </div>
    </div>
  );
};

export default SetNewPassword;
