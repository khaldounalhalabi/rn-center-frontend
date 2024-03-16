"use client";
import ResetCode from "@/components/common/Auth/ResetCode";

const page = () => {
  const apiResetPasswordCustomer: string = `customer/check-reset-password-code`;
  const apiResendCode = `customer/password-reset-request`;
  return (
    <ResetCode
      url={apiResetPasswordCustomer}
      urlResendCode={apiResendCode}
      pageType={"customer"}
    />
  );
};

export default page();
