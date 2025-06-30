"use client";
import FormInput from "@/components/common/ui/inputs/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import Form from "../ui/Form";

const ResetCodeForm = ({ role }: { role: RoleEnum }) => {
  const handleResendButton = () => {
    AuthService.make(role).resendVerificationCode();
  };

  const handleSubmit = (data: { code: string }) => {
    return AuthService.make(role).checkResetCode(data.code);
  };

  const router = useRouter();
  const onSuccess = () => {
    router.replace(`/auth/${role}/set-new-password`);
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
              <Form
                handleSubmit={handleSubmit}
                buttonText={t("send")}
                onSuccess={onSuccess}
              >
                <FormInput name="code" type="text" label={t("code")} />
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
