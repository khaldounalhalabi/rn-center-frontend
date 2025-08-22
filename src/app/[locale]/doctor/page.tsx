"use client";
import AttendanceCards from "@/components/common/attendance/AttendanceCards";
import AppointmentsTable from "@/components/doctor/appointments/AppointmentsTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("common.dashboard");

  return (
    <div>
      <AttendanceCards role={RoleEnum.DOCTOR} />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("todayAppointments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentsTable
              api={(page, Search, sortCol, sortDir, perPage, params) =>
                AppointmentService.make(RoleEnum.DOCTOR).todayAppointments(
                  page,
                  Search,
                  sortCol,
                  sortDir,
                  perPage,
                  params,
                )
              }
              key={"today_appointments_table"}
              without={[]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
