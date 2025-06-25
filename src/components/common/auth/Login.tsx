"use client";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { ApiResponse } from "@/http/Response";
import { cn } from "@/lib/utils";
import { AuthResponse } from "@/models/User";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Login = ({ role }: { role: RoleEnum }) => {
  const [error, setError] = useState(false);

  const handleSubmit = async (data: { phone: string; password: string }) => {
    setError(false);
    let response = await AuthService.make(role).login(
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
  const random = Math.round(Math.random()) % 2 == 0;
  const image = random ? "/hero.png" : "/login-right-side.png";
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
                  <FormInput name="phone" type="tel" label={t("phone")} />
                  <FormInput
                    name="password"
                    label={t("password")}
                    type="password"
                  />
                </div>

                {error && (
                  <p className="my-3 w-full p-2 text-sm text-destructive">
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
                  src={image}
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
