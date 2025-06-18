"use client";
import React from "react";
import { Clinic } from "@/models/Clinic";
import Overview from "@/components/admin/clinics/Overview";
import { useTranslations } from "next-intl";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enums/RoleEnum";
import Tabs from "@/components/common/ui/Tabs";
import PageCard from "@/components/common/ui/PageCard";
import useUser from "@/hooks/UserHook";
import PermissionEnum from "@/enums/PermissionEnum";

const ClinicOverview = ({ clinic }: { clinic: Clinic | null | undefined }) => {
  const t = useTranslations("admin.clinic.show");
  const { user } = useUser();
  const tabs = [
    {
      title: t("overview"),
      render: <Overview clinic={clinic} />,
    },
  ];

  if (
    user?.permissions?.includes(PermissionEnum.APPOINTMENT_MANAGEMENT) ||
    user?.role == RoleEnum.ADMIN
  ) {
    tabs.push({
      title: t("appointments"),
      render: (
        <PageCard>
          <AppointmentsTable
            without={["clinic.user.full_name"]}
            createUrl={`/${user?.role}/clinics/${clinic?.id}/appointments/create`}
            api={async (page, search, sortCol, sortDir, perPage, params) =>
              await AppointmentService.make(user?.role).getClinicAppointments(
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
        </PageCard>
      ),
    });
  }
  return (
    <div className={"w-full"}>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default ClinicOverview;
