import AttendanceCards from "@/components/common/attendance/AttendanceCards";
import { RoleEnum } from "@/enums/RoleEnum";

const Home = async () => {
  return <AttendanceCards role={RoleEnum.DOCTOR} />;
};

export default Home;
