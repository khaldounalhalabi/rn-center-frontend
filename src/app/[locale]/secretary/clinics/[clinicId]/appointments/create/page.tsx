import { getTranslations } from "next-intl/server";
import PageCard from "@/components/common/ui/PageCard";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import React from "react";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const t = await getTranslations("common.appointment.create");
  return (
    <PageCard>
      <h2 className="card-title">{t("createAppointment")}</h2>
      <AppointmentForm
        type="store"
        defaultClinicId={clinicId}
        redirect={`/secretary/clinics/${clinicId}`}
      />
    </PageCard>
  );
};

export default Page;
