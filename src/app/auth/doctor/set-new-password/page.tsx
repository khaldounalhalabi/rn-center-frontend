import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordDoctor: string = `doctor/reset-password`;
  return <SetNewPassword url={apiSetNewPasswordDoctor} pageType={"doctor"} />;
};

export default page();
