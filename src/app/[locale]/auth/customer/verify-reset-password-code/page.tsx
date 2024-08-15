import VerifyCode from "@/components/common/Auth/Customer/VerifyCode";

const Page = () => {
  return (
    <VerifyCode type="validate" successUrl={"/auth/customer/reset-password"} />
  );
};

export default Page;
