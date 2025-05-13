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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

const ResetPasswordRequest = ({ role }: { role: RoleEnum }) => {
  const handleSubmit = (data: { phone: string }) => {
    return AuthService.make<AuthService>(role).passwordResetRequest(data.phone);
  };
  const t = useTranslations("auth");
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl"}>{t("resetPassword")}</CardTitle>
              <CardDescription>{t("enter_your_phone")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                handleSubmit={handleSubmit}
                buttonText={t("send_reset_password_code")}
              >
                <FormInput
                  name="phone"
                  type="tel"
                  label={t("phone")}
                  placeholder="0912345678"
                />
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
