"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordDoctor: string = `${process.env.localApi}doctor/check-reset-password-code`;
  const apiResendCode = `${process.env.localApi}doctor/password-reset-request`;

  const headersMethod: string = "!sing";
  return (
    <ResetCode
      url={apiResetPasswordDoctor}
      urlResendCode={apiResendCode}
      typeHeaders={headersMethod}
      pageType={"doctor"}
    />
  );
};

export default page();
