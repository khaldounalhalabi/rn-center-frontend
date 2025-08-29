"use client";
import { Revalidate } from "@/actions/Revalidate";
import MediaTable from "@/components/common/media/MediaTable";
import MedicalRecordsTable from "@/components/common/medical-records/MedicalRecordsTable";
import PatientStudiesTable from "@/components/common/patient-studies/PatientStudiesTable";
import PrescriptionTable from "@/components/common/prescriptions/PrescriptionTable";
import PageCard from "@/components/common/ui/PageCard";
import Tabs from "@/components/common/ui/Tabs";
import AppointmentsTable from "@/components/doctor/appointments/AppointmentsTable";
import { RoleEnum } from "@/enums/RoleEnum";
import { Customer } from "@/models/Customer";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const PatientOverview = ({ patient }: { patient: Customer }) => {
  const t = useTranslations("common.patient.show");
  const attachmentsT = useTranslations("common.patient.attachments");
  const studiesT = useTranslations("patient_studies");

  return (
    <Tabs
      tabs={[
        {
          title: t("appointment"),
          render: (
            <PageCard>
              <AppointmentsTable
                api={async (page, search, sortCol, sortDir, perPage, params) =>
                  await AppointmentService.make(
                    RoleEnum.DOCTOR,
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
              />
            </PageCard>
          ),
        },
        {
          title: attachmentsT("title"),
          render: <MediaTable media={patient.attachments || []} />,
        },
        {
          title: studiesT("patient_studies"),
          render: (
            <PatientStudiesTable
              customerId={patient.id}
              files={patient?.patient_studies ?? []}
              onDelete={() => {
                Revalidate();
              }}
            />
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
                role={RoleEnum.DOCTOR}
              />
            </PageCard>
          ),
        },
      ]}
    />
  );
};

export default PatientOverview;
