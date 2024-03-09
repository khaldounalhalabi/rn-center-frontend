import VerificationEmailCode from "@/components/common/authCommon/VerificationEmailCode";

const page = () => {
  const apiVerificationEmailCode: string = `${process.env.localApi}customer/request-verification-code`;
  const apiResendVerCode: string = `${process.env.localApi}customer/request-verification-code`;
  const headersMethod: string = "!sing";

  return (
    <VerificationEmailCode
      url={apiVerificationEmailCode}
      urlResendCode={apiResendVerCode}
      typeHeaders={headersMethod}
      pageType={"customer"}
    />
  );
};

export default page;
