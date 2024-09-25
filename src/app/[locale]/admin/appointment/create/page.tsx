import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("common.appointment.create");
  return (
    <PageCard>
      <h2 className="card-title">{t("createAppointment")}</h2>
      <AppointmentForm type="store" />
    </PageCard>
  );
};

export default page;
