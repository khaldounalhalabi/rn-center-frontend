import SetNewPassword from "@/components/common/authCommon/SetNewPassword";

const page = () => {
  const apiSetNewPasswordAdmin: string = `${process.env.localApi}admin/reset-password`;
  const headersMethod: string = "!sing";
  return (
    <SetNewPassword
      url={apiSetNewPasswordAdmin}
      typeHeaders={headersMethod}
      pageType={"admin"}
    />
  );
};

export default page;
