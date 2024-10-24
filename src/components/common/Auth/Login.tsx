"use client";
import React, { useState } from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import { POST } from "@/Http/Http";
import { Navigate } from "@/Actions/navigate";
import { setCookieClient } from "@/Actions/clientCookies";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse } from "@/Models/User";
import { Role } from "@/enum/Role";
import { useTranslations } from "next-intl";

interface LoginProps {
  url: string;
  pageType: string;
}

const Login: React.FC<LoginProps> = ({ url, pageType }) => {
  const [error, setError] = useState(false);
  const [errorBlocked, setErrorBlocked] = useState();
  const [contractError, setContractError] = useState<string | undefined>(
    undefined,
  );

  const handleSubmit = (data: { email: string; password: string }) => {
    setError(false);
    return POST<AuthResponse>(url, data).then((res: any) => {
      if (res.code == 401) {
        setError(true);
        return res;
      } else if (res.code == 430 || res.code == 431 || res.code == 432) {
        setErrorBlocked(res?.message);
        return res;
      } else {
        Array.isArray(res?.data?.user?.role)
          ? res?.data?.user.role?.forEach((e: { id: number; name: string }) => {
              setCookieClient("role", e.name);
              if (e.name == Role.CLINIC_EMPLOYEE) {
                const permissions = res.data.user.permissions;
                return setCookieClient("permissions", permissions.toString());
              } else {
                return setCookieClient("permissions", "dffds%2Cfdsf");
              }
            })
          : false;
        return res;
      }
    });
  };

  function clinicDidntAgreeOnContract(data: ApiResponse<AuthResponse>) {
    return (
      pageType == "doctor" &&
      data.code == 200 &&
      data?.data?.user &&
      data?.data?.user?.clinic &&
      !data?.data?.user?.clinic?.agreed_on_contract
    );
  }

  const handleSuccess = (data: ApiResponse<AuthResponse>) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify(data?.data?.user ?? undefined),
    );
    setCookieClient("token", data?.data?.token ?? "");
    setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
    setCookieClient("user-type", pageType);
    if (clinicDidntAgreeOnContract(data)) {
      if (data?.data?.user?.role?.[0].name == Role.CLINIC_EMPLOYEE) {
        setContractError("Clinic owner must agree on the system contract");
      } else {
        Navigate("/auth/contract");
      }
    } else {
      Navigate(`/${pageType}`);
    }
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
            <Input
              name="email"
              type="email"
              label={t("email")}
              placeholder="Enter Your Email"
            />
            <Input
              name="password"
              label={t("password")}
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          {error && (
            <p className="my-3 p-2 w-full text-error text-sm">{t("err")}.</p>
          )}
          {errorBlocked ? (
            <p className="my-3 p-2 w-full text-error text-sm">{errorBlocked}</p>
          ) : (
            ""
          )}

          {contractError ? (
            <p className="my-3 p-2 w-full text-error text-sm">
              {contractError}
            </p>
          ) : (
            ""
          )}

          <div className="flex justify-center opacity-80 mt-4">
            <h4>{t("forgetPassword")}?</h4>
            <Link
              href={`/auth/${pageType}/reset-password`}
              className="text-blue-600 ml-1"
            >
              {t("resetPassword")}
            </Link>
          </div>
          {pageType == "doctor" && (
            <div className="flex justify-center opacity-80 mt-4">
              <h4>{t("join_request")}</h4>
              <Link
                href={`/auth/${pageType}/join-request`}
                className="text-blue-600 ml-1"
              >
                {t("join_us")}
              </Link>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
