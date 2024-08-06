"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import { POST } from "@/Http/Http";
import { AuthResponse } from "@/Models/User";
import { isArray } from "util";
import { setCookieClient } from "@/Actions/clientCookies";
import { Role } from "@/enum/Role";
import { ApiResponse } from "@/Http/Response";
import { Navigate } from "@/Actions/navigate";
import { Link } from "@/navigation";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import ButtonSinSvg from "@/components/common/Auth/Customer/ButtonSin";

const LoginCustomer = ({ url }: { url: string }) => {
  const [error, setError] = useState(false);
  const [errorBlocked, setErrorBlocked] = useState();

  const handleLogIn =async (data: { email: string; password: string }) => {
    console.log(data)
    setError(false);
    return await POST<AuthResponse>(url, data).then((res: any) => {
      console.log(res);
      if (res.code == 401) {
        setError(true);
        return res;
      } else if (res.code == 430 || res.code == 431) {
        setErrorBlocked(res?.message);
        return res;
      } else if(res.code == 433){
        setCookieClient("unverified-email", data.email);
        Navigate(`/auth/customer/verification-email-code`);
      } {
        isArray(res?.data?.user?.role)
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

  const handleSuccess = (data: ApiResponse<AuthResponse>) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify(data?.data?.user ?? undefined),
    );
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
          "w-full md:w-[50%] max-w-[900px] md:h-full h-[85vh] flex flex-col  items-center "
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
                button={"w-fit h-fit"}
                buttonText={""}
                NewButton={
                  <button className={"w-52 h-16 relative group hover:border-2 border-[#1FB8B9]  rounded-[30px]"}>
                    <ButtonSinSvg className={"w-full h-full group-hover:hidden"} />
                    <p
                      className={
                        "absolute tracking-5 top-1/2 right-1/2 group-hover:text-black -translate-y-1/2 translate-x-1/2 font-bold kodchasan text-[16px] text-white"
                      }
                    >
                      Log In
                    </p>
                  </button>
                }
              >
                <InputLoginCustomer
                  name={"number"}
                  label={"Phone Number"}
                  type={"number"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <InputLoginCustomer
                  name={"password"}
                  label={"Password"}
                  type={"text"}
                  labelClass={
                    "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <div className={'w-full flex justify-end'}>
                  <Link
                      href={"/auth/customer/reset-password"}
                      className={
                        " tracking-5 font-light text-[#1FB8B9] md:text-[16px] text-[14px]"
                      }
                  >
                    Forget password?
                  </Link>
                </div>
              </Form>
              <hr className={"h-[2px] w-full bg-[#bcdfe6]"} />
              {error && (
                  <p className="my-3 p-2 w-full text-error text-sm">
                    The email or password is incorrect. Try again or click Forgot
                    Password.
                  </p>
              )}
              {errorBlocked ? (
                  <p className="my-3 p-2 w-full text-error text-sm">{errorBlocked}</p>
              ) : (
                  ""
              )}
              <p
                className={
                  " md:text-[16px] text-[14px] mt-4 opacity-60 text-[#013567]"
                }
              >
                Don’t have an account?{" "}
                <Link href={"/auth/customer/register"} className={"text-[#1FB8B9] "}>
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