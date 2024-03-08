"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordCustomer: string = `${process.env.localApi}customer/check-reset-password-code`;
  const headersMethod: string = "!sing";
  return (
    <ResetCode
      url={apiResetPasswordCustomer}
      typeHeaders={headersMethod}
      pageType={"customer"}
    />
  );
};

export default page();
