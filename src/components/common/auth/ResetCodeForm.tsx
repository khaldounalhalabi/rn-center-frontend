"use client";
import React from "react";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { AuthService } from "@/services/AuthService";
import Form from "../ui/Form";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

const ResetCodeForm = ({ role }: { role: RoleEnum }) => {
  const handleResendButton = () => {
    AuthService.make<AuthService>(role)
      .resendVerificationCode()
      .then((res) => {
        if (res.ok()) {
          toast.success((res?.message as string) ?? "success");
        }
      });
  };

  const handleSubmit = (data: { code: string }) => {
    return AuthService.make<AuthService>(role).checkResetCode(data.code);
  };
  const t = useTranslations("auth");
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl"}>
                {t("resetPasswordCode")}
              </CardTitle>
              <CardDescription>{t("enterResetPasswordCode")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form handleSubmit={handleSubmit} buttonText={t("send")}>
                <FormInput
                  name="code"
                  type="text"
                  label={t("code")}
                  placeholder="Enter Reset Code"
                />
                <div className="w-full text-left">
                  <p
                    onClick={handleResendButton}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                  >
                    {t("resendThecode")} ?
                  </p>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetCodeForm;
