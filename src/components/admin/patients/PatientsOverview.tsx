"use client";
import React from "react";
import { Customer } from "@/models/Customer";
import { useTranslations } from "next-intl";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enums/RoleEnum";
import Tabs from "@/components/common/ui/Tabs";
import PrescriptionTable from "@/components/common/prescriptions/PrescriptionTable";
import MediaTable from "@/components/common/media/MediaTable";
import PageCard from "@/components/common/ui/PageCard";
import MedicalRecordsTable from "@/components/common/medical-records/MedicalRecordsTable";

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
            <PageCard>
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
            </PageCard>
          ),
        },
        {
          title: t("prescriptions"),
          render: (
            <PageCard>
              <PrescriptionTable patientId={patient?.id} />
            </PageCard>
          ),
        },
        {
          title: t("medical_records"),
          render: (
            <PageCard>
              <MedicalRecordsTable
                patientId={patient?.id}
                role={RoleEnum.ADMIN}
              />
            </PageCard>
          ),
        },
      ]}
    />
  );
};

export default PatientsOverview;
