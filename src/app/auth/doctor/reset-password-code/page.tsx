"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordDoctor: string = `doctor/check-reset-password-code`;
  const apiResendCode = `doctor/password-reset-request`;

  return (
    <ResetCode
      url={apiResetPasswordDoctor}
      urlResendCode={apiResendCode}
      pageType={"doctor"}
    />
  );
};

export default page();
