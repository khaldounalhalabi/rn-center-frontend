"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordCustomer: string = `${process.env.localApi}customer/check-reset-password-code`;
  const apiResendCode = `${process.env.localApi}customer/password-reset-request`;
  const headersMethod: string = "!sing";
  return (
    <ResetCode
      url={apiResetPasswordCustomer}
      urlResendCode={apiResendCode}
      typeHeaders={headersMethod}
      pageType={"customer"}
    />
  );
};

export default page();
