import CheckinCheckoutCards from "@/components/common/attendance/CheckinCheckoutCards";
import { RoleEnum } from "@/enums/RoleEnum";
import AttendanceLogService from "@/services/AttendanceLogService";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const t = await getTranslations("common.dashboard");
  const stats = (await AttendanceLogService.make(RoleEnum.DOCTOR).myStat())
    .data;
  return (
    <>
      <CheckinCheckoutCards stats={stats} role={RoleEnum.DOCTOR} />
    </>
  );
};

export default Home;
