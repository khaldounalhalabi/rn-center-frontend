import SetPhone from "@/components/common/auth/SetPhone";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = () => {
  return <SetPhone role={RoleEnum.DOCTOR} />;
};

export default Page;
