"use client";
import React from "react";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { AuthService } from "@/services/AuthService";
import Form from "../ui/Form";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enum/RoleEnum";

const SetNewPassword = ({ role }: { role: RoleEnum }) => {
  const handleSubmit = (data: {
    password: string;
    password_confirmation: string;
  }) => {
    return AuthService.make<AuthService>(role).resetPassword(
      data.password,
      data.password_confirmation,
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
            <FormInput
              name="password"
              type={"text"}
              label={t("password")}
              placeholder="Enter New Password"
            />
            <FormInput
              name="password_confirmation"
              type="text"
              label={t("confirm-password")}
              placeholder="Reset New Password"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetNewPassword;
