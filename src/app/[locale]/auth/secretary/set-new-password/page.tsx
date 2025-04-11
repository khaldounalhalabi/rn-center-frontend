import SetNewPassword from "@/components/common/Auth/SetNewPassword";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <SetNewPassword role={RoleEnum.SECRETARY} />;
};

export default page;
