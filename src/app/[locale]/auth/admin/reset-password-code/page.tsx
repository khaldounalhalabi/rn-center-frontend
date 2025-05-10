import ResetCodeForm from "@/components/common/auth/ResetCodeForm";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <ResetCodeForm role={RoleEnum.ADMIN} />;
};

export default page;
