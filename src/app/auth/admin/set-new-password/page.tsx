import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordAdmin: string = `admin/reset-password`;
  return <SetNewPassword url={apiSetNewPasswordAdmin} pageType={"admin"} />;
};

export default page;
