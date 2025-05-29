import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.create");

  const appointment = (
    await AppointmentService.make(RoleEnum.ADMIN).show(
      appointmentId,
    )
  ).data;

  return (
    <PageCard
      title={t("editAppointment")}
      description={`${t("patientName")} : ${appointment?.customer?.user?.full_name}`}
    >
      <AppointmentForm
        type={"update"}
        defaultValues={appointment}
        redirect={"/admin/appointment"}
      />
    </PageCard>
  );
};

export default page;
