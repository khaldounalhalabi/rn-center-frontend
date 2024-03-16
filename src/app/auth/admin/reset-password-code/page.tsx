"use client";
import ResetCode from "@/components/common/Auth/ResetCode";

const page = () => {
  const apiResetPasswordAdmin: string = `admin/check-reset-password-code`;
  const apiResendCode = `admin/password-reset-request`;
  return (
    <ResetCode
      url={apiResetPasswordAdmin}
      urlResendCode={apiResendCode}
      pageType={"admin"}
    />
  );
};

export default page;
