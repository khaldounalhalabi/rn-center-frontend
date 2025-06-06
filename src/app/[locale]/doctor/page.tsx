import CheckinCheckoutCards from "@/components/common/attendance/CheckinCheckoutCards";
import { RoleEnum } from "@/enums/RoleEnum";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const t = await getTranslations("common.dashboard");
  return (
    <CheckinCheckoutCards role={RoleEnum.DOCTOR} />
  );
};

export default Home;
