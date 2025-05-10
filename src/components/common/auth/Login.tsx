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
import { RoleEnum } from "@/enum/RoleEnum";

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
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2  left-1/2 bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">{t("signIn")}</h1>
          <h4 className="mt-4 text-gray-500">{t("welcomeBack")}!</h4>
        </div>
        <Form
          handleSubmit={handleSubmit}
          onSuccess={handleSuccess}
          buttonText={t("Login")}
        >
          <div className="flex flex-col gap-5">
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
            <p className="my-3 p-2 w-full text-error text-sm">{t("err")}.</p>
          )}

          <div className="flex justify-center opacity-80 mt-4 gap-1">
            <h4>{t("forgetPassword")}</h4>
            <Link
              href={`/auth/${role}/reset-password`}
              className="text-blue-600 ml-1"
            >
              {t("resetPassword")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
