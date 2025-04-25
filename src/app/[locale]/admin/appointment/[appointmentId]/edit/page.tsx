import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enum/RoleEnum";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.create");

  const appointment = (
    await AppointmentService.make<AppointmentService>(RoleEnum.ADMIN).show(
      appointmentId,
    )
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">{t("editAppointment")}</h2>
      <label className={""}>
        {t("patientName")} :{" "}
        <span className={"badge"}>
          {appointment?.customer?.user?.full_name}
        </span>
      </label>
      <AppointmentForm type={"update"} defaultValues={appointment} />
    </PageCard>
  );
};

export default page;
