"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordAdmin: string = `${process.env.localApi}admin/check-reset-password-code`;
  const headersMethod: string = "!sing";
  return (
    <ResetCode
      url={apiResetPasswordAdmin}
      typeHeaders={headersMethod}
      pageType={"admin"}
    />
  );
};

export default page;
