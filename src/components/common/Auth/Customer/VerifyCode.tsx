"use client";
import { deleteCookieClient, getCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import Form from "@/components/common/ui/Form";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import { CustomerAuthService } from "@/services/CustomerAuthService";
import { useState } from "react";
import { toast } from "react-toastify";

const VerifyCode = ({
  successUrl,
  type = "verify",
}: {
  successUrl: string;
  type?: "verify" | "validate";
}) => {
  const customerPhoneNumber =
    getCookieClient("customer_phone_number") ?? undefined;
  const [requestVerificationCodeMessage, setRequestVerificationCodeMessage] =
    useState<string | undefined>();
  const handleSubmit = async (data: { verification_code: string }) => {
    if (type == "verify") {
      return await CustomerAuthService.make<CustomerAuthService>()
        .verifyCode(data)
        .then((res) => {
          if (res.code == 200) {
            deleteCookieClient("customer_phone_number");
          }
          return res;
        });
    } else {
      return await CustomerAuthService.make<CustomerAuthService>().validateResetPasswordCode(
        data,
      );
    }
  };

  const handleSuccess = () => {
    Navigate(successUrl);
  };

  return (
    <div
      className={
        "min-w-full  tracking-5 min-h-screen content-end bg-gradient-to-b from-[#1FB8B9]  to-[#8AFEFF] md:flex md:justify-center md:items-center"
      }
    >
      <div
        className={
          "w-full md:w-[50%] max-w-[900px] md:h-full h-[85vh] flex flex-col  items-center "
        }
      >
        <h1
          className={" text-[20px] md:text-[32px] font-semibold text-[#f1fcfc]"}
        >
          Enter your verification code sent you using sms
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
                handleSubmit={handleSubmit}
                onSuccess={handleSuccess}
                className={"w-full"}
                otherSubmitButton={(isSubmitting) => (
                  <AuthSubmitButton type="submit" isSubmitting={isSubmitting}>
                    Verify
                  </AuthSubmitButton>
                )}
                defaultButton={false}
              >
                <InputLoginCustomer
                  name={"verification_code"}
                  label={"Verification Code"}
                  type={"text"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
              </Form>
              <div
                onClick={() => {
                  if (customerPhoneNumber) {
                    CustomerAuthService.make<CustomerAuthService>()
                      .requestVerificationCode({
                        phone_number: customerPhoneNumber,
                      })
                      .then((res) => {
                        if (res.code == 200) {
                          setRequestVerificationCodeMessage(
                            res.message as string,
                          );
                        }
                      });
                  } else {
                    toast(
                      "There is been an error please enter your number here",
                      { autoClose: false, type: "error" },
                    );
                    Navigate("/auth/customer/request-verification-code");
                  }
                }}
                className={
                  "cursor-pointer w-full flex flex-col items-center justify-center"
                }
              >
                <a
                  className={
                    "tracking-5 font-light text-[#1FB8B9] md:text-[16px] text-[14px]"
                  }
                >
                  Did not get a verification code
                </a>
                {requestVerificationCodeMessage && (
                  <p className="text-error text-center">
                    {requestVerificationCodeMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;

/**
 * Thanks to redeemer for cheer me up
 */
