"use client";
import ResetCodeForm from "@/components/common/Auth/ResetCodeForm";

const page = () => {
  const apiResetPasswordDoctor: string = `doctor/check-reset-password-code`;
  const apiResendCode = `doctor/password-reset-request`;

  return (
    <ResetCodeForm
      url={apiResetPasswordDoctor}
      urlResendCode={apiResendCode}
      pageType={"doctor"}
    />
  );
};

export default page;
