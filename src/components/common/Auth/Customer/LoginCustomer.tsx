"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import { POST } from "@/Http/Http";
import { AuthResponse } from "@/Models/User";
import { setCookieClient } from "@/Actions/clientCookies";
import { ApiResponse } from "@/Http/Response";
import { Navigate } from "@/Actions/navigate";
import { Link } from "@/navigation";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import AuthSubmitButton from "./AuthSubmitButton";
import { CustomerAuthService } from "@/services/CustomerAuthService";

const LoginCustomer = () => {
  const [error, setError] = useState(false);
  const [errorBlocked, setErrorBlocked] = useState<string>();

  const handleLogIn = async (data: {
    phone_number: string;
    password: string;
  }) => {
    setError(false);
    return await POST<AuthResponse>("customer/login", data).then((res) => {
      if (res.code == 401) {
        setError(true);
        return res;
      } else if (res.code == 430 || res.code == 431) {
        setErrorBlocked(res?.message as string);
        return res;
      } else if (res.code == 434) {
        setCookieClient("customer_phone_number", data.phone_number);
        CustomerAuthService.make<CustomerAuthService>()
          .requestVerificationCode({ phone_number: data.phone_number })
          .then((response) => {
            if (response.code == 200) {
              Navigate("/auth/customer/verify-code");
            }
          });
      }
      return res;
    });
  };

  const handleSuccess = (data: ApiResponse<AuthResponse>) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify(data?.data?.user ?? undefined),
    );
    setCookieClient("role", data?.data?.user?.role?.[0]?.name ?? "");
    setCookieClient("token", data?.data?.token ?? "");
    setCookieClient("refresh_token", data?.data?.refresh_token ?? "");
    setCookieClient("user-type", "customer");
    Navigate(`/customer`);
  };
  return (
    <div
      className={
        "min-w-full kodchasan tracking-5 min-h-screen content-end bg-gradient-to-b from-[#1FB8B9]  to-[#8AFEFF] md:flex md:justify-center md:items-center"
      }
    >
      <div
        className={
          "w-full md:w-[80%] lg:w-[65%] xl:w-[50%] max-w-[900px] md:h-full h-[85vh] flex flex-col  items-center "
        }
      >
        <h1
          className={
            "kodchasan text-[40px] md:text-[64px] font-semibold text-[#f1fcfc]"
          }
        >
          Welcome back
        </h1>
        <div
          className={
            "mt-[15vh] md:mt-10 bg-[#FFFFFF] opacity-90  md:opacity-[70%] rounded-t-[30px] md:rounded-[30px] w-full h-full"
          }
        >
          <div className={"card "}>
            <div
              className={
                "card-body className={'flex flex-col md:px-40 md:py-20 items-center"
              }
            >
              <Form
                handleSubmit={handleLogIn}
                onSuccess={handleSuccess}
                className={"w-full"}
                otherSubmitButton={(isSubmitting) => (
                  <AuthSubmitButton isSubmitting={isSubmitting}>
                    Login
                  </AuthSubmitButton>
                )}
                defaultButton={false}
              >
                <InputLoginCustomer
                  name={"phone_number"}
                  label={"Phone Number"}
                  type={"tel"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <InputLoginCustomer
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                  labelClass={
                    "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                {error && (
                  <p className="my-3 p-2 w-full text-error text-sm">
                    The phone number or password is incorrect. Try again or
                    click Forgot Password.
                  </p>
                )}
                {errorBlocked ? (
                  <p className="my-3 p-2 w-full text-error text-sm">
                    {errorBlocked}
                  </p>
                ) : (
                  ""
                )}
                <div className={"w-full flex justify-end"}>
                  <Link
                    href={"/auth/customer/request-reset-password"}
                    className={
                      " tracking-5 font-light text-[#1FB8B9] md:text-[16px] text-[14px]"
                    }
                  >
                    Forget password?
                  </Link>
                </div>
              </Form>
              <hr className={"h-[2px] w-full bg-[#bcdfe6]"} />
              <p
                className={
                  " md:text-[16px] text-[14px] mt-4 opacity-60 text-[#013567]"
                }
              >
                Don’t have an account?{" "}
                <Link
                  href={"/auth/customer/register"}
                  className={"text-[#1FB8B9] "}
                >
                  sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
