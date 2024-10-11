"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import InputLoginCustomer from "../../ui/Inputs/InputLoginCustomer";
import { CustomerAuthService } from "@/services/CustomerAuthService";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "./AuthSubmitButton";

const ResetPasswordRequest = () => {
  const handleSubmit = async (data: { phone_number: string }) => {
    return await CustomerAuthService.make<CustomerAuthService>().requestResetPasswordCode(
      data,
    );
  };

  const handleSuccess = () => {
    Navigate("/auth/customer/verify-code");
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
          Request a reset password code
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
                    Send sms
                  </AuthSubmitButton>
                )}
                defaultButton={false}
              >
                <p>
                  We will send you an sms with a verification code so you can
                  reset your password
                </p>
                <InputLoginCustomer
                  name={"phone_number"}
                  label={"Phone Number"}
                  type={"tel"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
