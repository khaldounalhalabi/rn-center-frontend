import SetNewPassword from "@/components/common/Auth/SetNewPassword";

const page = () => {
  const apiSetNewPasswordCustomer: string = `customer/reset-password`;
  return (
    <SetNewPassword url={apiSetNewPasswordCustomer} pageType={"customer"} />
  );
};

export default page();
