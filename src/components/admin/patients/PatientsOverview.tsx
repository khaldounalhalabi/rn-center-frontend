"use client";
import { Revalidate } from "@/actions/Revalidate";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";
import MediaTable from "@/components/common/media/MediaTable";
import MedicalRecordsTable from "@/components/common/medical-records/MedicalRecordsTable";
import PatientStudiesTable from "@/components/common/patient-studies/PatientStudiesTable";
import PrescriptionTable from "@/components/common/prescriptions/PrescriptionTable";
import PageCard from "@/components/common/ui/PageCard";
import Tabs from "@/components/common/ui/Tabs";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { Customer } from "@/models/Customer";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const PatientsOverview = ({ patient }: { patient: Customer }) => {
  const t = useTranslations("common.patient.show");
  const attachmentsT = useTranslations("common.patient.attachments");
  const studiesT = useTranslations("patient_studies");
  const { role, user } = useUser();
  const tabs = [
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
      title: t("medical_records"),
      render: (
        <PageCard>
          <MedicalRecordsTable
            patientId={patient?.id}
            role={role ?? RoleEnum.PUBLIC}
          />
        </PageCard>
      ),
    },
  ];

  if (
    user?.permissions?.includes(PermissionEnum.MEDICINE_MANAGEMENT) ||
    role == RoleEnum.ADMIN
  ) {
    tabs.push({
      title: t("prescriptions"),
      render: (
        <PageCard>
          <PrescriptionTable patientId={patient?.id} />
        </PageCard>
      ),
    });
  }

  if (
    user?.permissions?.includes(PermissionEnum.APPOINTMENT_MANAGEMENT) ||
    role == RoleEnum.ADMIN
  ) {
    tabs.push({
      title: t("appointment"),
      render: (
        <PageCard>
          <AppointmentsTable
            api={async (page, search, sortCol, sortDir, perPage, params) =>
              await AppointmentService.make(role).getCustomerAppointments(
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
            createUrl={`/${role}/patients/${patient?.id}/appointments/create`}
          />
        </PageCard>
      ),
    });
  }
  return <Tabs tabs={tabs} />;
};

export default PatientsOverview;
