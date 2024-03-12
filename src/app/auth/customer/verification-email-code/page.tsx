import VerificationEmailCode from "@/components/common/authCommon/VerificationEmailCode";

const page = () => {
  const apiVerificationEmailCode: string = `customer/request-verification-code`;
  const apiResendVerCode: string = `customer/request-verification-code`;

  return (
    <VerificationEmailCode
      url={apiVerificationEmailCode}
      urlResendCode={apiResendVerCode}
      pageType={"customer"}
    />
  );
};

export default page;
