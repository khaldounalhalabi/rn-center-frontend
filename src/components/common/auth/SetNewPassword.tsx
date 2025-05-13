"use client";
import React from "react";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { AuthService } from "@/services/AuthService";
import Form from "../ui/Form";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl"}>{t("resetPassword")}</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
