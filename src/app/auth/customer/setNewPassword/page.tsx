import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordCustomer: string = `${process.env.localApi}customer/reset-password`;
  const headersMethod: string = "!sing";
  return (
    <SetNewPassword
      url={apiSetNewPasswordCustomer}
      typeHeaders={headersMethod}
      pageType={"customer"}
    />
  );
};

export default page();
