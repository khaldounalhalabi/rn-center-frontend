import CheckinCheckoutCards from "@/components/common/attendance/CheckinCheckoutCards";
import Grid from "@/components/common/ui/Grid";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import AttendanceLogService from "@/services/AttendanceLogService";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const t = await getTranslations("common.dashboard");
  const stats = (await AttendanceLogService.make(RoleEnum.DOCTOR).myStat())
    .data;
  return (
    <>
      <Grid sm={2} md={3} className={"p-5"}>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <CardTitle>Absence days</CardTitle>
            <CardDescription>{stats.absence_days}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <CardTitle>Attendance days</CardTitle>
            <CardDescription>
              {stats.attendance_days} / {stats.expected_days}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <CardTitle>Attendance Hours</CardTitle>
            <CardDescription>
              {stats.attendance_hours} / {stats.expected_hours}
            </CardDescription>
          </CardHeader>
        </Card>
      </Grid>
      <CheckinCheckoutCards stats={stats} role={RoleEnum.DOCTOR} />
    </>
  );
};

export default Home;
