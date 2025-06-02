"use client";
import MediaTable from "@/components/common/media/MediaTable";
import PrescriptionTable from "@/components/common/prescriptions/PrescriptionTable";
import PageCard from "@/components/common/ui/PageCard";
import Tabs from "@/components/common/ui/Tabs";
import { RoleEnum } from "@/enums/RoleEnum";
import { Customer } from "@/models/Customer";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";
import AppointmentsTable from "@/components/doctor/appointments/AppointmentsTable";

const PatientOverview = ({ patient }: { patient: Customer }) => {
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
          title: t("prescriptions"),
          render: (
            <PageCard>
              <PrescriptionTable patientId={patient?.id} />
            </PageCard>
          ),
        },
      ]}
    />
  );
};

export default PatientOverview;
