import SetNewPassword from "@/components/common/auth/SetNewPassword";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <SetNewPassword role={RoleEnum.ADMIN} />;
};

export default page;
