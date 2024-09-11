"use client";
import React, { useState } from "react";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import { POST } from "@/Http/Http";
import { setCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import AuthSubmitButton from "./AuthSubmitButton";
import {swal} from "@/Helpers/UIHelpers";

const RegisterCustomer = () => {
  const [privacy, setPrivacy] = useState<boolean>(false);
  const handleRegister = async (data: any) => {
    if(privacy){
      return await POST("/customer/register", data)
    }else {
     return swal.fire({
        title: "We Apologize",
        text: "You do not agree to the privacy policies.",
        icon: "question"
      });
    }
  };

  const handleSuccess = (data: any) => {
    window.localStorage.setItem(
      "user",
      JSON.stringify(data?.data?.user ?? undefined),
    );
    setCookieClient("user-type", "customer");
    Navigate(`/auth/customer/verify-code`);
  };

    return (
    <div
      className={
        "min-w-full kodchasan tracking-5 min-h-screen content-end bg-gradient-to-b from-[#1FB8B9]  to-[#8AFEFF] md:flex md:justify-center md:items-center"
      }
    >
      <div
        className={
          "w-full md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[900px] md:h-full h-[90vh] flex flex-col  items-center "
        }
      >
        <h1
          className={
            "kodchasan text-[40px] md:text-[64px] font-semibold text-[#f1fcfc]"
          }
        >
          Join PoM family
        </h1>
        <div
          className={
            "mt-[5vh] md:mt-10 bg-[#FFFFFF] opacity-90  md:opacity-[70%] rounded-t-[30px] md:rounded-[30px] w-full h-full"
          }
        >
          <div className={"card"}>
            <div
              className={
                "card-body className={'flex flex-col md:px-40 md:py-20 items-center"
              }
            >
              <Form
                  // @ts-ignore
                  handleSubmit={handleRegister}
                onSuccess={handleSuccess}
                className={"w-full"}
                otherSubmitButton={(isSubmitting) => (
                  <AuthSubmitButton
                    isSubmitting={isSubmitting}
                  >
                    Create
                  </AuthSubmitButton>
                )}
                defaultButton={false}
              >
                <InputLoginCustomer
                  name={"first_name"}
                  label={"First name"}
                  type={"text"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <InputLoginCustomer
                  name={"middle_name"}
                  label={"Middle name"}
                  type={"text"}
                  labelClass={
                    "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <InputLoginCustomer
                  name={"last_name"}
                  label={"Last name"}
                  type={"text"}
                  labelClass={
                    "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
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
                <InputLoginCustomer
                  name={"password_confirmation"}
                  label={"Confirm Password"}
                  type={"password"}
                  labelClass={
                    "text-[#2e5b83] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
                <div className={"flex justify-start w-fit items-center mt-4"}>
                  <p
                    className={
                      " md:text-[15px] w-fit text-[14px]   text-[#013567]"
                    }
                  >
                    i have agree to{" "}
                    <Link href={"/"} className={"text-[#1FB8B9] "}>
                      privacy policy
                    </Link>{" "}
                  </p>
                  <input
                    type="checkbox"
                    className="checkbox ml-2"
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                </div>
              </Form>
              <hr className={"h-[2px] w-full bg-[#bcdfe6]"} />

              <p className={" md:text-[16px] text-[14px] mt-4  text-[#013567]"}>
                Already have an account?{" "}
                <Link
                  href={"/auth/customer/login"}
                  className={"text-[#1FB8B9] "}
                >
                  sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;