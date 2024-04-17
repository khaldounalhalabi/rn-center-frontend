import ResetCodeForm from "@/components/common/Auth/ResetCodeForm";

const page = () => {
  const apiResetPasswordAdmin: string = `admin/check-reset-password-code`;
  const apiResendCode = `admin/password-reset-request`;
  return (
    <ResetCodeForm
      url={apiResetPasswordAdmin}
      urlResendCode={apiResendCode}
      pageType={"admin"}
    />
  );
};

export default page;
