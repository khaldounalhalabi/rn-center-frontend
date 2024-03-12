import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordCustomer: string = `customer/reset-password`;
  return (
    <SetNewPassword url={apiSetNewPasswordCustomer} pageType={"customer"} />
  );
};

export default page();
