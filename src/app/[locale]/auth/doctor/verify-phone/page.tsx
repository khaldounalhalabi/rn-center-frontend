import VerifyPhone from "@/components/common/auth/VerifyPhone";
import { RoleEnum } from "@/enums/RoleEnum";
const Page = () => {
  return <VerifyPhone role={RoleEnum.DOCTOR} />;
};

export default Page;
