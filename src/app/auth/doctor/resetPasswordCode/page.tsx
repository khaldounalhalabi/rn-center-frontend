"use client";
import ResetCode from "@/components/common/authCommon/ResetCode";

const page = () => {
  const apiResetPasswordDoctor: string = `${process.env.localApi}doctor/check-reset-password-code`;
  const headersMethod: string = "!sing";
  return (
    <ResetCode
      url={apiResetPasswordDoctor}
      typeHeaders={headersMethod}
      pageType={"doctor"}
    />
  );
};

export default page();
