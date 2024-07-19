import VerificationEmailCodeCustomer from "@/components/common/Auth/Customer/VerificationEmailCodeCustomer";

const page = () => {
  const apiVerificationEmailCode: string = `customer/request-verification-code`;
  const apiResendVerCode: string = `customer/request-verification-code`;

  return (
    <VerificationEmailCodeCustomer
      url={apiVerificationEmailCode}
      urlResendCode={apiResendVerCode}
    />
  );
};

export default page;
