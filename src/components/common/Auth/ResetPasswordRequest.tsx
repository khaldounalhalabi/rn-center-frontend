"use client";
import React from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { AuthService } from "@/services/AuthService";
import Form from "../ui/Form";
import {useTranslations} from "next-intl";

const ResetPasswordRequest = ({
  url,
  typePage,
}: {
  url: string;
  typePage: string;
}) => {
  const handleSubmit = (data: { email: string }) => {
    window.localStorage.setItem(typePage, data.email);

    return AuthService.make<AuthService>().requestResetPasswordRequest(
      url,
      data,
      typePage,
    );
  };
  const t = useTranslations('auth')
  return (
    <div
      className="relative w-[100wh] h-[100vh]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <div className="top-1/2 left-1/2 absolute bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">
            {t("resetPassword")}
          </h1>
          <h4 className="mt-4 text-gray-500">{t("enteryourEmailAddress")}</h4>
        </div>
        <Form
          handleSubmit={handleSubmit}
          buttonText={t("sendResetPasswordEmail")}
        >
          <Input
            name="email"
            type="text"
            label={t("email")}
            placeholder="Enter Email"
          />
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;