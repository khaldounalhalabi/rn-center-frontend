import VerifyCode from "@/components/common/Auth/Customer/VerifyCode";

const Page = () => {
  return <VerifyCode successUrl={"/auth/customer/login"} />;
};

export default Page;
