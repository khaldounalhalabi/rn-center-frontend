import SetNewPassword from "@/components/common/auth/SetNewPassword";
import { RoleEnum } from "@/enums/RoleEnum";

const page = () => {
  return <SetNewPassword role={RoleEnum.SECRETARY} />;
};

export default page;
