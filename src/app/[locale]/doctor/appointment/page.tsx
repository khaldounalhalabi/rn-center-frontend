"use client";
import React from "react";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enums/RoleEnum";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import PageCard from "@/components/common/ui/PageCard";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.appointment.table")
  return (
    <PageCard title={t("appointments")}>
      <AppointmentsTable
        without={["clinic.user.full_name"]}
        api={async (page, search, sortCol, sortDir, perPage, params) =>
          await AppointmentService.make(
            RoleEnum.DOCTOR,
          ).indexWithPagination(page, search, sortCol, sortDir, perPage, params)
        }
        createUrl={undefined}
      />
    </PageCard>
  );
};

export default Page;
