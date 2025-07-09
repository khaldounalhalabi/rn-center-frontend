"use client";
import { Navigate } from "@/actions/Navigate";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Form from "../ui/Form";
import FormInput from "../ui/inputs/FormInput";
import { setPhone } from "@/actions/HelperActions";

const VerifyPhone = ({ role }: { role: RoleEnum }) => {
  const t = useTranslations("auth");
  const [resending, setResending] = useState(false);
  const handleSubmit = async (data: any) => {
    return await AuthService.make(role).verifyPhone(data.verification_code);
  };

  const resendCode = async () => {
    setResending(true);
    await AuthService.make(role)
      .resendVerificationCode()
      .then(() => {
        setResending(false);
      });
  };

  const onSuccess = async () => {
    await Navigate(`/${role}/login`);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl"}>{t("verify_phone")}</CardTitle>
              <CardDescription>
                {t("enter_verification_code_recieved_via_sms")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                handleSubmit={handleSubmit}
                onSuccess={onSuccess}
                buttonText={t("verify")}
                className={"p-6 md:p-8"}
              >
                <div className="flex flex-col gap-6">
                  <FormInput
                    name="verification_code"
                    label={t("verification_code")}
                    type="text"
                  />
                </div>
              </Form>
              <div className="flex items-center justify-between w-full">
                <p className="w-full text-xs">{t("didnt_get_code")}</p>
                <Button className="w-full" variant={"link"} onClick={resendCode} type="button">
                  {t("resendThecode")}{" "}
                  {resending && <LoadingSpin className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
