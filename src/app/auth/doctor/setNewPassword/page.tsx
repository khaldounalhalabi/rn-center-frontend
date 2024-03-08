import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordDoctor: string = `${process.env.localApi}doctor/reset-password`;
  const headersMethod: string = "!sing";
  return (
    <SetNewPassword
      url={apiSetNewPasswordDoctor}
      typeHeaders={headersMethod}
      pageType={"doctor"}
    />
  );
};

export default page();
