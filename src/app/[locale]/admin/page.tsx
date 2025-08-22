"use client";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import TransactionsChartsAndCards from "@/components/common/transactions/TransactionsChartsAndCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.dashboard");
  return (
    <div className="w-full h-full flex flex-col">
      <TransactionsChartsAndCards role={RoleEnum.ADMIN} />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("todayAppointments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentsTable
              api={(page, Search, sortCol, sortDir, perPage, params) =>
                AppointmentService.make(RoleEnum.ADMIN).todayAppointments(
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
    </div>
  );
};

export default Page;
