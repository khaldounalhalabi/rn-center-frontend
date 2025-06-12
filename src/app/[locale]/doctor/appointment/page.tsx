"use client";
import PageCard from "@/components/common/ui/PageCard";
import AppointmentsTable from "@/components/doctor/appointments/AppointmentsTable";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.appointment.table");
  return (
    <PageCard title={t("appointments")}>
      <AppointmentsTable
        api={async (page, search, sortCol, sortDir, perPage, params) =>
          await AppointmentService.make(RoleEnum.DOCTOR).indexWithPagination(
            page,
            search,
            sortCol,
            sortDir,
            perPage,
            params,
          )
        }
      />
    </PageCard>
  );
};

export default Page;
