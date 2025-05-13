"use client";
import React, { useState } from "react";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import { ApiResponse } from "@/http/Response";
import { AuthResponse } from "@/models/User";
import { useTranslations } from "next-intl";
import { AuthService } from "@/services/AuthService";
import useUser from "@/hooks/UserHook";
import { RoleEnum } from "@/enums/RoleEnum";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/shadcn/card";

const Login = ({ role }: { role: RoleEnum }) => {
  const [error, setError] = useState(false);

  const handleSubmit = async (data: { phone: string; password: string }) => {
    setError(false);
    let response = await AuthService.make<AuthService>(role).login(
      data.phone,
      data.password,
    );

    if (response.isNotAuthorized()) {
      setError(true);
    }
    return response;
  };
  const { setUser } = useUser();
  const handleSuccess = (data: ApiResponse<AuthResponse>) => {
    setUser(data?.data?.user);
  };
  const t = useTranslations("auth");
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form
                handleSubmit={handleSubmit}
                onSuccess={handleSuccess}
                buttonText={t("Login")}
                className={"p-6 md:p-8"}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{t("signIn")}</h1>
                    <p className="text-balance text-muted-foreground">
                      {t("welcomeBack")}!
                    </p>
                  </div>
                  <FormInput
                    name="phone"
                    type="tel"
                    label={t("phone")}
                    placeholder="Enter your phone number"
                  />
                  <FormInput
                    name="password"
                    label={t("password")}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>

                {error && (
                  <p className="my-3 w-full p-2 text-sm text-error">
                    {t("err")}.
                  </p>
                )}

                <div className="mt-4 flex justify-center gap-1 opacity-80">
                  <h4>{t("forgetPassword")}</h4>
                  <Link
                    href={`/auth/${role}/reset-password`}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                  >
                    {t("resetPassword")}
                  </Link>
                </div>
              </Form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="/login-right-side.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
