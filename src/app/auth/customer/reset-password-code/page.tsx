"use client";
import ResetCodeForm from "@/components/common/Auth/ResetCodeForm";

const page = () => {
  const apiResetPasswordCustomer: string = `customer/check-reset-password-code`;
  const apiResendCode = `customer/password-reset-request`;
  return (
    <ResetCodeForm
      url={apiResetPasswordCustomer}
      urlResendCode={apiResendCode}
      pageType={"customer"}
    />
  );
};

export default page();
