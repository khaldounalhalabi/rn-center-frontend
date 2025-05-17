import { getTranslations } from "next-intl/server";
import PageCard from "@/components/common/ui/PageCard";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import React from "react";

const Page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.appointment.create");
  return (
    <PageCard title={t("createAppointment")}>
      <AppointmentForm
        type="store"
        defaultCustomerId={patientId}
        redirect={`/admin/patients/${patientId}`}
      />
    </PageCard>
  );
};

export default Page;
