import SetNewPassword from "@/components/common/auth/SetNewPassword";
import { RoleEnum } from "@/enums/RoleEnum";

const page = () => {
  return <SetNewPassword role={RoleEnum.ADMIN} />;
};

export default page;
