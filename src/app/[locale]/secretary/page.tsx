import AttendanceCards from "@/components/common/attendance/AttendanceCards";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = () => {
  return <AttendanceCards role={RoleEnum.SECRETARY} />;
};

export default Page;
