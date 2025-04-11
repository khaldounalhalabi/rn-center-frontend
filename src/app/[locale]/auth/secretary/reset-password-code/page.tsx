import ResetCodeForm from "@/components/common/Auth/ResetCodeForm";
import { RoleEnum } from "@/enum/RoleEnum";

const page = () => {
  return <ResetCodeForm role={RoleEnum.SECRETARY} />;
};

export default page;
