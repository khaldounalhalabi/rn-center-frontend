import AttendanceCards from "@/components/common/attendance/AttendanceCards";
import { RoleEnum } from "@/enums/RoleEnum";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  return (
    <AttendanceCards role={RoleEnum.DOCTOR} />
  );
};

export default Home;
