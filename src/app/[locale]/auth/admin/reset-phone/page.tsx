import SetPhone from "@/components/common/auth/SetPhone";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = () => {
  return <SetPhone role={RoleEnum.ADMIN} />;
};

export default Page;
