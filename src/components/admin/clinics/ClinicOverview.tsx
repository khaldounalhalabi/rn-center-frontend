"use client";
import React from "react";
import { Clinic } from "@/models/Clinic";
import Overview from "@/components/admin/clinics/Overview";
import { useTranslations } from "next-intl";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enums/RoleEnum";
import Tabs from "@/components/common/ui/Tabs";

const ClinicOverview = ({ clinic }: { clinic: Clinic | null | undefined }) => {
  const t = useTranslations("admin.clinic.show");
  return (
    <div className={"w-full"}>
      <Tabs
        tabs={[
          {
            title: t("overview"),
            render: <Overview clinic={clinic} />,
          },
          {
            title: t("appointments"),
            render: (
              <AppointmentsTable
                without={["clinic.user.full_name"]}
                createUrl={`/admin/clinics/${clinic?.id}/appointments/create`}
                api={async (page, search, sortCol, sortDir, perPage, params) =>
                  await AppointmentService.make(
                    RoleEnum.ADMIN,
                  ).getClinicAppointments(
                    clinic?.id ?? 0,
                    page,
                    search,
                    sortCol,
                    sortDir,
                    perPage,
                    params,
                  )
                }
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default ClinicOverview;
