"use client";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import AttendanceCards from "@/components/common/attendance/AttendanceCards";
import TransactionsChartsAndCards from "@/components/common/transactions/TransactionsChartsAndCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.dashboard");
  const { user } = useUser();
  return (
    <div>
      <AttendanceCards role={RoleEnum.SECRETARY} />
      {user?.permissions?.includes(PermissionEnum.TRANSACTION_MANAGEMENT) && (
        <TransactionsChartsAndCards role={RoleEnum.SECRETARY} />
      )}
      {user?.permissions?.includes(PermissionEnum.APPOINTMENT_MANAGEMENT) && (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("todayAppointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentsTable
                api={(page, Search, sortCol, sortDir, perPage, params) =>
                  AppointmentService.make(RoleEnum.SECRETARY).todayAppointments(
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
                createUrl={undefined}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Page;
