"use client";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.appointment.table");
  return (
    <PageCard title={t("appointments")}>
      <AppointmentsTable
        createUrl={"/secretary/appointment/create"}
        without={[]}
        api={async (page, search, sortCol, sortDir, perPage, params) =>
          await AppointmentService.make(RoleEnum.SECRETARY).indexWithPagination(
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
