import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const appointment = (
    await AppointmentService.make<AppointmentService>("admin").show(
      appointmentId,
    )
  ).data;
  const availableTimes = await AppointmentService.make<AppointmentService>(
    "admin",
  ).getAvailableTimes(appointment.clinic_id);

  return (
    <PageCard>
      <h2 className="card-title">Edit Appointment</h2>
      <label className={""}>
        Patient name :{" "}
        <span className={"badge"}>
          {TranslateServer(appointment?.customer?.user?.full_name)}
        </span>
      </label>
      <AppointmentForm
        type={"update"}
        defaultValues={{
          ...appointment,
        }}
        availableTimes={availableTimes.data}
      />
    </PageCard>
  );
};

export default page;
