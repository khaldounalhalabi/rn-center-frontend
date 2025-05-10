"use client";
import React from "react";
import { Customer } from "@/Models/Customer";
import { useTranslations } from "next-intl";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enum/RoleEnum";
import Tabs from "@/components/common/ui/Tabs";
import PrescriptionTable from "@/components/common/prescriptions/PrescriptionTable";
import MediaTable from "@/components/common/media/MediaTable";

const PatientsOverview = ({ patient }: { patient: Customer }) => {
  const t = useTranslations("common.patient.show");
  const attachmentsT = useTranslations("common.patient.attachments");
  return (
    <Tabs
      tabs={[
        {
          title: attachmentsT("title"),
          render: <MediaTable media={patient.attachments || []} />,
        },
        {
          title: t("appointment"),
          render: (
            <AppointmentsTable
              api={async (page, search, sortCol, sortDir, perPage, params) =>
                await AppointmentService.make(
                  RoleEnum.ADMIN,
                ).getCustomerAppointments(
                  patient?.id,
                  page,
                  search,
                  sortCol,
                  sortDir,
                  perPage,
                  params,
                )
              }
              without={["customer.user.full_name"]}
              createUrl={`/admin/patients/${patient?.id}/appointments/create`}
            />
          ),
        },
        {
          title: t("prescriptions"),
          render: <PrescriptionTable patientId={patient?.id} />,
        },
      ]}
    />
  );
};

export default PatientsOverview;
